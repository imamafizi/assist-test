import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePegawai,
  fetchPegawai,
  updatePegawai,
} from "../redux/pegawaiSlice";

function PegawaiTable() {
  const pegawai = useSelector((state) => state.pegawai.entities);
  const dispatch = useDispatch();
  const [updatedPegawai, setUpdatedPegawai] = useState({});

  useEffect(() => {
    dispatch(fetchPegawai());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePegawai(id));
  };

  const handleUpdate = (id) => {
    dispatch(updatePegawai({ id, pegawai: updatedPegawai[id] }));
    setUpdatedPegawai((prevState) => ({
      ...prevState,
      [id]: {},
    }));
  };

  const handleChange = (event, id) => {
    const { name, value } = event.target;
    setUpdatedPegawai((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value,
      },
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>pegawai</TableCell>
            <TableCell>Jalan</TableCell>
            <TableCell>Provinsi</TableCell>
            <TableCell>Kota</TableCell>
            <TableCell>Kecamatan</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pegawai.map((pegawai) => (
            <TableRow key={pegawai.id}>
              <TableCell>{pegawai.id}</TableCell>
              <TableCell>
                <TextField
                  name="nama"
                  value={updatedPegawai[pegawai.id]?.nama || pegawai.nama}
                  onChange={(e) => handleChange(e, pegawai.id)}
                  variant="outlined"
                  size="small"
                  placeholder="New Nama"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="jalan"
                  value={updatedPegawai[pegawai.id]?.jalan || pegawai.jalan}
                  onChange={(e) => handleChange(e, pegawai.id)}
                  variant="outlined"
                  size="small"
                  placeholder="New Jalan"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="provinsi"
                  value={
                    updatedPegawai[pegawai.id]?.provinsi ||
                    pegawai.provinsi.name
                  }
                  onChange={(e) => handleChange(e, pegawai.id)}
                  variant="outlined"
                  size="small"
                  placeholder="New Provinsi"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="kota"
                  value={updatedPegawai[pegawai.id]?.kota || pegawai.kota}
                  onChange={(e) => handleChange(e, pegawai.id)}
                  variant="outlined"
                  size="small"
                  placeholder="New Kota"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="kecamatan"
                  value={
                    updatedPegawai[pegawai.id]?.kecamatan ||
                    pegawai.kecamatan.name
                  }
                  onChange={(e) => handleChange(e, pegawai.id)}
                  variant="outlined"
                  size="small"
                  placeholder="New Kecamatan"
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleUpdate(pegawai.id)}>Update</Button>
                <Button onClick={() => handleDelete(pegawai.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PegawaiTable.propTypes = {
  pegawai: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      jalan: PropTypes.string.isRequired,
      provinsi: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      kota: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      kecamatan: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PegawaiTable;
