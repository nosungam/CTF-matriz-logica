import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const passwordLetters = ["p", "a", "s", "s", "w", "o", "r", "d"];

  // Matriz de ejemplo - puedes modificarla
  const [matriz] = useState([
    ["1", "0", "-", "1", "1", "0", "1", "0"],
    ["0", "1", "1", "0", "0", "1", "-", "1"],
    ["1", "1", "0", "-", "0", "0", "1", "0"],
    ["0", "-", "1", "0", "1", "1", "0", "0"],
    ["-", "0", "1", "1", "0", "1", "0", "1"],
    ["0", "1", "-", "0", "1", "0", "1", "1"],
    ["-", "1", "1", "0", "0", "1", "0", "0"],
    ["0", "0", "1", "1", "1", "0", "1", "-"],
    ["1", "0", "0", "1", "-", "1", "1", "1"],
    ["0", "1", "-", "0", "1", "0", "0", "1"],
  ]);

  useEffect(() => {
    const urlBackend =
      import.meta.env.VITE_URL_BACKEND || "http://localhost:3000";
    const combinaciones = {
      p: "¬I ∧ ( B ∧ (¬J ∨ (D ↔ H)) ) ∧ ( (G ∧ ¬F) ∨ (E ∧ C) )",
      a: "( A ∨ D ) ∧ ( ¬C ∨ ( E ∧ ( F ∨ ¬G ) ) ) ∧ ( H ↔ ¬J )",
      s: "( ¬A ∧ B ) ∨ ( D ∧ ( E ∨ ¬F ) ) ∧ ( G ∨ ( H ∧ ¬I ) )",
      w: "A ∧ ¬D ∧ ¬(B ⊕ E)",
      o: "I ∧ ( J ⊕ (A ∨ ¬C) ) ∧ ¬( D ∧ (B ↔ H) )",
      r: "F ∧ (G ∨ ¬H) ∧ ¬(A ∧ C)",
      d: "¬A ∧ (B ⊕ C) ∧ (D ∨ E)",
      A: "((11 ∧ ¬810) ∨ (35 ⊕ 48)) ∨ (¬(12 ∧ 23) ∧ 14)",
      B: "((¬12 ∧ (23 ∨ (14 ∧ ¬25))) ∨ ((26 ∧ 27) ⊕ 28)) ∧ (21 ∨ (¬22 ∧ 25))",
      C: "((81 ∧ ¬32) ∨ (33 ∧ (34 ∨ 35))) ⊕ ((26 ∨ ¬37) ∧ 38)",
      D: "((41 ↔ 42) ∧ (57 ∨ ¬44)) ∧ ((45 ∧ 46) ∧ ¬47) ⊕ (41 ∧ 44)",
      E: "((51 ∧ (¬52 ∨ 53)) ∨ (54 ∧ (55 ↔ 56))) ⊕ (57 ∨ ¬58)",
      F: "((69 ∨ 610) ∧ ¬(63 ⊕ 64)) ∨ ((65 ∧ 66) ∧ (67 ∨ ¬68)) ∧ (610 ∨ 69)",
      G: "((71 ∧ (38 ∨ ¬73)) ∨ (74 ∧ (84 ⊕ 76))) ∧ ¬78 ∨ (¬86 ∧ 71)",
      H: "((810 ⊕ ¬82) ∨ (83 ∧ (75 ↔ 85))) ∨ (¬86 ∧ 87)",
      I: "((19 ∧ 29) ∨ (39 ∧ ¬49)) ⊕ ((19 ∨ ¬69) ∧ (11 ↔ 89))",
      J: "((¬110 ∧ (210 ∨ (12 ∧ ¬410))) ∨ ((510 ⊕ 610) ∧ (710 ∨ 810))) ∧ (110 ∨ ¬810)",
    };
    for (const [key, value] of Object.entries(combinaciones)) {
      fetch(`${urlBackend}/matriz-logica/combinacion/${value}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: key,
        },
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || value === "0" || value === "1") {
      e.target.value = value;
    } else {
      e.target.value = e.target.value.slice(0, -1);
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        <span style={{ color: "rgb(255, 100, 100)" }}>Consigue</span>{" "}
        <span style={{ color: "rgb(100, 150, 255)" }}>la</span>{" "}
        <span style={{ color: "rgb(150, 255, 100)" }}>Password</span>{" "}
        <span style={{ color: "rgb(255, 200, 100)" }}>Verdadera</span>
      </h1>

      <div className="table-wrapper">
        <table className="main-table">
          <tbody>
            <tr className="password-row">
              <td className="row-header"></td>
              {passwordLetters.map((letter, index) => (
                <td key={index}>
                  <div>{letter.toUpperCase()}</div>
                </td>
              ))}
            </tr>
            {letters.map((letter, rowIndex) => (
              <tr key={rowIndex}>
                <td className="row-header">{letter}</td>
                {passwordLetters.map((_, colIndex) => {
                  const cellValue = matriz[rowIndex][colIndex];
                  const isEditable = cellValue === "-";

                  return (
                    <td key={colIndex}>
                      {isEditable ? (
                        <input
                          type="text"
                          maxLength="1"
                          className="cell-input"
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="cell-disabled">{cellValue}</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
