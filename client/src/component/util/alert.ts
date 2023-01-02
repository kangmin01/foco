import Swal from 'sweetalert2';

const primary = '#517DA6';

export const InfoAlert = (txt: any) => {
  return Swal.fire({ title: txt, icon: 'info', confirmButtonColor: primary });
};

export const SuccessAlert = (txt: any) => {
  return Swal.fire({
    title: txt,
    icon: 'success',
    confirmButtonColor: primary,
  });
};
