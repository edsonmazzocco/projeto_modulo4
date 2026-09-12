
export function getDataLocalStorage() {

    const dadosLocalStorage = localStorage.getItem("@dadosLogin");

    if (dadosLocalStorage) {
        return JSON.parse(dadosLocalStorage);
    } else {
        return "";
    }
}