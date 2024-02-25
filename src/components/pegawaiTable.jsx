import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { deletePegawai } from "../redux/pegawaiSlice";

function PegawaiTable({ pegawai }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePegawai(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nama</TableCell>
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
              <TableCell>{pegawai.nama}</TableCell>
              <TableCell>{pegawai.jalan}</TableCell>
              <TableCell>{pegawai.provinsi}</TableCell>
              <TableCell>{pegawai.kota}</TableCell>
              <TableCell>{pegawai.kecamatan}</TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(pegawai.id)}>
                  <DeleteIcon />
                </IconButton>
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
