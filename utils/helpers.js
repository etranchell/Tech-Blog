// module.exports = {
//   formatDate(date) {
//     return `${new Date(date).getMonth() + 1}/${new Date(
//       date
//     ).getDate()}/${new Date(date).getFullYear()}`;
//   },
// };

// module.exports = {
//   formatDate: function () {
//     let objectDate = new Date();

//     let day = objectDate.getDate();
//     console.log(day);

//     let month = objectDate.getMonth() + 1;
//     console.log(month);

//     let year = objectDate.getFullYear();
//     console.log(year);

//     let format1 = month + "/" + day + "/" + year;
//     console.log(format1);
//   },
// };

// module.exports = {
//   formatDate: function (date) {
//     let objectDate = new Date(date);

//     let day = objectDate.getDate();
//     let month = objectDate.getMonth() + 1;
//     let year = objectDate.getFullYear();

//     return `${month}/${day}/${year}`;
//   }
// };

// module.exports = {
//   formatDate: function (date) {
//     const objectDate = new Date(date);

//     const day = objectDate.getDate();
//     const month = objectDate.getMonth() + 1;
//     const year = objectDate.getFullYear();

//     return `${month}/${day}/${year}`;
//   }
// };

module.exports = {
  formatDate: function (date) {
    const objectDate = new Date(date);

    const day = objectDate.getDate();
    const month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  },
};
