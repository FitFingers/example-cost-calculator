// const [date, setDate] = useState("01.01.2020 08:30")
      /* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Display date={date} region="Europe/Berlin" />
        <Display date={date} region="Asia/Bangkok" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <p style={{ opacity: 0.6 }}>
          Unix stamp for Germany on 01.01.2020 at 08:30:
          <br />
          1577863800000
        </p>
      </div> */


// const Display = ({ date, region }) => {
//   const momentDate = moment(date, "DD.MM.YYYY HH:mm", region)
//   return (
//     <div style={{ textAlign: "center" }}>
//       <p>
//         <b>Date in {region}: </b>
//       </p>
//       <p>{momentDate.toString() || "No date provided"}</p>
//       <p>{momentDate.format("x") || "No date provided"}</p>
//     </div>
//   )
// }