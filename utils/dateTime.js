exports.makeDate = (d) => {
  d = new Date(d);
  console.log(d, "dateee");
  return (
    d.getFullYear() +
    "-" +
    addZero(d.getMonth() + 1) +
    "-" +
    addZero(d.getDate())
  );
};

// wil return 09, 05, 10
function addZero(n = 0) {
  return (n < 10 ? "0" : "") + n;
}
