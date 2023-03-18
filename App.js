import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"

import NotaEditor from "./src/componentes/NotaEditor";
import Nota from "./src/componentes/Nota";
import { buscaNotas, criaTabela } from "./src/services/Notas";

export default function App() {
  const [notas, setNotas] = useState([]);
  const [notaSel, setNotaSel] = useState({});

  useEffect(() => {
    criaTabela();
  }, []);

  useEffect(() => {
    async function inicNotas() {
      await mostraNotas();
    }
    inicNotas();
  }, []);


  async function mostraNotas() {
    const notes = await buscaNotas();
    setNotas(notes);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => (
          <Nota item={nota.item} setNotaSel={setNotaSel} />
        )}
        keyExtractor={(nota) => nota.id}
      />
      <NotaEditor
        showNotas={mostraNotas}
        notaSel={notaSel}
        setNotaSel={setNotaSel}
      />
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

