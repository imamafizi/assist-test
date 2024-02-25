import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPegawai, updatePegawai } from "../redux/pegawaiSlice";

function PegawaiForm({ initialProvinces, editData }) {
  const [nama, setNama] = useState("");
  const [jalan, setJalan] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kotaOptions, setKotaOptions] = useState([]);
  const [kecamatanOptions, setKecamatanOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setNama(editData.nama);
      setJalan(editData.jalan);
      setProvinsi(editData.provinsi);
      setKota(editData.kota);
      setKecamatan(editData.kecamatan);
      setIsEditing(true);
    }
  }, [editData]);

  useEffect(() => {
    if (!initialProvinces) {
      fetchProvinces();
    } else {
      setProvinsiOptions(initialProvinces);
    }
  }, [initialProvinces]);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
      );
      setProvinsiOptions(response.data);
    } catch (error) {
      console.error("Error fetching provinsi: ", error);
    }
  };

  const fetchKota = async (provinsiId) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}.json`
      );
      setKotaOptions(response.data);
    } catch (error) {
      console.error("Error fetching kota: ", error);
    }
  };

  const fetchKecamatan = async (kotaId) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaId}.json`
      );
      setKecamatanOptions(response.data);
    } catch (error) {
      console.error("Error fetching kecamatan: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provinsiValue =
      typeof provinsi === "object" ? provinsi.name : provinsi;
    const kotaValue = typeof kota === "object" ? kota.name : kota;

    if (isEditing) {
      await dispatch(
        updatePegawai({
          id: editData.id,
          nama,
          jalan,
          provinsi: provinsiValue,
          kota: kotaValue,
          kecamatan,
        })
      );
    } else {
      await dispatch(
        createPegawai({
          nama,
          jalan,
          provinsi: provinsiValue,
          kota: kotaValue,
          kecamatan,
        })
      );
    }

    setNama("");
    setJalan("");
    setProvinsi("");
    setKota("");
    setKecamatan("");
    setIsEditing(false);
  };

  const handleProvinceChange = (event, newValue) => {
    setProvinsi(newValue);
    if (newValue) {
      fetchKota(newValue.id);
    }
  };

  const handleCityChange = (event, newValue) => {
    setKota(newValue);
    if (newValue) {
      fetchKecamatan(newValue.id);
    }
  };

  console.log(editData, "data edit");
  console.log(initialProvinces, "profinsi");
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Jalan"
        value={jalan}
        onChange={(e) => setJalan(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Autocomplete
        options={provinsiOptions}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => handleProvinceChange(value)}
        value={provinsi}
        renderInput={(params) => (
          <TextField {...params} label="Provinsi" margin="normal" />
        )}
      />
      <Select
        value={kota}
        onChange={(e) => handleCityChange(e.target.value)}
        fullWidth
        margin="normal"
      >
        {kotaOptions.map((kota) => (
          <MenuItem key={kota.id} value={kota}>
            {kota.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={kecamatan}
        onChange={(e) => setKecamatan(e.target.value)}
        fullWidth
        margin="normal"
      >
        {kecamatanOptions.map((kecamatan) => (
          <MenuItem key={kecamatan.id} value={kecamatan}>
            {kecamatan.name}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" color="primary">
        {isEditing ? "Update" : "Create"}
      </Button>
    </form>
  );
}

export default PegawaiForm;
