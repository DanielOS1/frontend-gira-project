import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: "row",
        // Si quieres un poco de espacio entre los iconos puedes añadir:
        justifyContent: "space-between",
        width: 60, // Ajusta este valor según sea necesario para el espaciado
    },
    addButtonText: {
        fontSize: 30,
        color: "#fff",
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: 10, // Añade un margen a la izquierda para separar los iconos
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 8, // Añade un poco de espacio en la parte superior
      },
      teamItem: {
        backgroundColor: '#1c1c1e', // Un tono oscuro pero que permita distinguir cada ítem
        borderRadius: 8, // Bordes redondeados
        paddingVertical: 16, // Espaciado vertical dentro de cada ítem
        paddingHorizontal: 20, // Espaciado horizontal dentro de cada ítem
        marginHorizontal: 16, // Espaciado horizontal para los bordes de la lista
        marginVertical: 8, // Espaciado vertical entre ítems
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para Android
      },
      teamName: {
        color: '#FFF',
        fontWeight: "bold",
        fontSize: 18, // Tamaño de fuente más grande para el nombre del equipo
      },
      addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2868c7",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
});

export default styles;
