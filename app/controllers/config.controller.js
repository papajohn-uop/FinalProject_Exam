//Simple config controller. Not actual opeaitioanl for security. 
//This woudl point to another API
exports.configDev = (req, res) => {
  
    console.log(req.params.dev_id)
   // res.send("MYDATA");
    //res.json({ message: "At this point we would hit the required API at the radio config server for a  device with id-->"+ req.params.dev_id+". For safety reasons no such config will take place."});
    res.json({ message: "At this point we would hit the required API at the radio config server to actually configure the selected device. For safety reasons no such config will take place."});
};

