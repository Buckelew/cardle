import { useTable } from "react-table";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;

{
  /* <table className="Game-table">
        <thead>
          <tr>
            <td>Make</td>
            <td>Model</td>
            <td>Origin</td>
            <td>Production date(s)</td>
            <td>Body Style</td>
            <td>Engine</td>
          </tr>
        </thead>

        <tbody>
          {guesses.map((car, i) => {
            // find if bodystyles partial
            let bodyStylesStyle = "incorrect";
            car.bodyStyles.forEach((style) => {
              if (carOfTheDay.bodyStyles.includes(style))
                bodyStylesStyle = "partial";
            });

            if (car.bodyStyles.join() == carOfTheDay.bodyStyles.join())
              bodyStylesStyle = "correct";

            // find product date up or down
            let lowestYear = Math.min(...car.years);
            let highestYear = Math.max(...car.years);
            let clowestYear = Math.min(...carOfTheDay.years);
            let chighestYear = Math.max(...carOfTheDay.years);
            // years = `${lowestYear} - ${highestYear}`;
            let dateEstimate = "incorrect";
            car.years.forEach((year) => {
              carOfTheDay.years.forEach((cyear) => {
                if (year == cyear) dateEstimate = "partial";
              });
            });

            let dateElement = "";
            if (lowestYear > chighestYear) dateElement = "↓";
            if (highestYear < clowestYear) dateElement = "↑";

            if (car.years.join() == carOfTheDay.years.join())
              dateEstimate = "correct";

            return (
              <tr key={i}>
                <td
                  className={
                    car.make == carOfTheDay.make ? "correct" : "incorrect"
                  }
                >
                  {car.make}
                </td>
                <td
                  className={
                    car.model == carOfTheDay.model ? "correct" : "incorrect"
                  }
                >
                  {car.model}
                </td>
                <td
                  className={
                    car.origin == carOfTheDay.origin ? "correct" : "incorrect"
                  }
                >
                  {car.origin}
                </td>
                <td className={dateEstimate}>
                  {`${lowestYear} - ${highestYear}`}
                  {" " + dateElement}
                </td>
                <td className={bodyStylesStyle}>{car.bodyStyles.join(", ")}</td>
                <td
                  className={
                    car.engine.toLowerCase() == carOfTheDay.engine.toLowerCase()
                      ? "correct"
                      : car.engineType == carOfTheDay.engineType ||
                        car.engineCyl == carOfTheDay.engineCyl
                      ? "partial"
                      : "incorrect"
                  }
                >
                  {car.engineType + " "}
                  {car.engineCyl}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */
}
