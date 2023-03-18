import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import { Picker } from "@react-native-picker/picker";

import NotaEditor from "./src/componentes/NotaEditor";
import Nota from "./src/componentes/Nota";
import { buscaNotas, criaTabela } from "./src/services/Notas";

export default function App() {
  const [notas, setNotas] = useState([]);
  const [notaSel, setNotaSel] = useState({});
  const [categoria, setCategoria] = useState("*");

  useEffect(() => {
    criaTabela();
  }, []);

  useEffect(() => {
    async function inicNotas() {
      await mostraNotas();
    }
    inicNotas();
  }, [categoria]);

  async function mostraNotas() {
    const notes = await buscaNotas(categoria);
    setNotas(notes);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.modalPicker}>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item label="Todos" value="*" />
          <Picker.Item label="Pessoal" value="Pessoal" />
          <Picker.Item label="Trabalho" value="Trabalho" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>
      </View>
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
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 12
  },
})

