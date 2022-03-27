const formatNumber = (n: number) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DataFormatter = {
    formatNumber: formatNumber,
};

export default DataFormatter;
