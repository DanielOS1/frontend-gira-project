import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    teamItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    teamName: {
        fontWeight: "bold",
    },

    iconContainer: {
        flexDirection: "row",
        // Si quieres un poco de espacio entre los iconos puedes añadir:
        justifyContent: "space-between",
        width: 60, // Ajusta este valor según sea necesario para el espaciado
    },

    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8, // for Android shadow

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
});

export default styles;
