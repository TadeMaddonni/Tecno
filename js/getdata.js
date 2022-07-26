const getData = async () => {
    const response = await fetch("/js/data/data.json");
    const data = await response.json();

    return data
}


export default getData