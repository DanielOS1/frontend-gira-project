import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: "row",
       
        justifyContent: "space-between",
        width: 60,
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
        marginLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 8,
      },
      teamItem: {
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      teamName: {
        color: '#FFF',
        fontWeight: "bold",
        fontSize: 18,
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
