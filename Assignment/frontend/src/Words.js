import React from "react";

function Words({ wordlist }) {
  var x = JSON.parse(wordlist);
  console.log(x);

  const listItems = x.map((i) => {
    return (
      <tbody>
        <tr>
          <td>{i.key}</td>
          <td>{i.value}</td>
        </tr>
      </tbody>
    );
  });
  return (
    <>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Word</th>
            <th scope="col">frequency</th>
          </tr>
        </thead>
        {listItems}
      </table>
    </>
  );
}

export default Words;
