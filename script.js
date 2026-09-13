 function cek() {
 
  var nama = document.getElementById("nama").value;
  var nilai = document.getElementById("nilai").value;
  var error = document.getElementById("error");

  error.innerText = "";
  if (nama == "") {
    error.innerText = "Nama harus diisi dulu ya!";
    return;
  }

  if (nilai == "") {
    error.innerText = "Nilainya belum diisi!";
    return;
  }

  
  nilai = Number(nilai);

  if (nilai < 0 || nilai > 100) {
    error.innerText = "Nilai harus antara 0 sampai 100!";
    return;
  }

  var grade = "";

  if (nilai >= 90) {
    grade = "A";
  } else if (nilai >= 80) {
    grade = "B";
  } else if (nilai >= 70) {
    grade = "C";
  } else if (nilai >= 60) {
    grade = "D";
  } else {
    grade = "E";
  }

 
  var status = "";

  if (nilai >= 70) {
    status = "LULUS";
  } else {
    status = "TIDAK LULUS";
  }

  
  document.getElementById("outNama").innerText = nama;
  document.getElementById("outNilai").innerText = nilai;
  document.getElementById("outGrade").innerText = grade;
  document.getElementById("outStatus").innerText = status;
}