import db from '../database';

export function criaTabela() {
  db.transaction((tx) => {
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS Notas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          categoria TEXT,
          texto
          TEXT
        );
      `,
      [],
      (_, error) => {
        console.log(error);
      }
    );
  });
}

export async function adicionaNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);
        `,
        [
          nota.titulo,
          nota.categoria,
          nota.texto
        ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Erro ao adicionar nota: " + JSON.stringify(nota));
        },
        (_, error) => reject(error)
      )
    })
  })
}

export async function buscaNotas(categoria = "*") {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      let comando;
      if (categoria === "*") {
        comando = "SELECT * FROM Notas;";
      } else {
        comando = `SELECT * FROM Notas WHERE categoria = "${categoria}";`;
      }

      tx.executeSql(comando, [],
        (transaction, resultado) => {
          resolve(resultado.rows._array);
        },
        (_, error) => reject(error)
      )
    })
  })
}

export async function atualizaNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE ID = ?;
        `,
        [
          nota.titulo,
          nota.categoria,
          nota.texto,
          nota.id
        ],
        () => {
          resolve('Nota atualizada com sucesso');
        },
        (_, error) => reject(error)
      )
    })
  })
}

export async function removeNota(id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          DELETE FROM Notas WHERE ID = ?;
        `,
        [
          id
        ],
        () => {
          resolve('Nota removida com sucesso');
        },
        (_, error) => reject(error)
      )
    })
  })
}
