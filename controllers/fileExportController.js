

const exportPDF = async (req, res) => {

    try {
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      return res.send(`File has been uploaded.`);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload image: ${error}`);
    }
  }

  const exportxslxFile = (req, res) => {

  }

  const exportCSVFile = (req, res) => {

  }

  export { exportPDF, exportxslxFile, exportCSVFile }