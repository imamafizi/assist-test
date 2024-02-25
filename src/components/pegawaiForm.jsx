import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { addpegawai, updatePegawai } from "../redux/pegawaiSlice";

function PegawaiForm() {
  const [nama, setNama] = useState("");
  const [jalan, setJalan] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kotaOptions, setKotaOptions] = useState([]);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const getProvinsi = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces"
      );
      setProvinsiOptions(response.data.results);
    } catch (error) {
      console.error("Error fetching provinsi: ", error);
    }
  };

  const fetchKota = async (provinsiId) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}`
      );
      setKotaOptions(response.data.results);
    } catch (error) {
      console.error("Error fetching kota: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updatePegawai({ id, nama, jalan, provinsi, kota, kecamatan }));
    } else {
      dispatch(addpegawai({ nama, jalan, provinsi, kota, kecamatan }));
    }
    setNama("");
    setJalan("");
    setProvinsi("");
    setKota("");
    setKecamatan("");
    setId(null);
  };

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
        onChange={(event, newValue) => {
          setProvinsi(newValue);
          if (newValue) fetchKota(newValue.id);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Provinsi" margin="normal" />
        )}
      />
      <Select
        value={kota}
        onChange={(e) => setKota(e.target.value)}
        fullWidth
        margin="normal"
      >
        {kotaOptions.map((kota) => (
          <MenuItem key={kota.id} value={kota}>
            {kota.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Kecamatan"
        value={kecamatan}
        onChange={(e) => setKecamatan(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Simpan
      </Button>
    </form>
  );
}

export default PegawaiForm;
