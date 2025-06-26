const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const router = express.Router();
import { getData, deleteRow, insertRow } from '../public/readData'


router.use(bodyParser.json());



router.post('/estimate', async (req, res) => {
  const { method } = req.body;

  
    try {
      const res = await axios.post("https://spectraserver-indol.vercel.app/api/def-token",{id: "67c1b750d9d50f71141aa1e0"},{headers:{
        'Content-Type':'application/json'
      }});
      const token = res.data.token;
      !token && console.log('Token not found')
      
      const response = await axios.post('http://apps.teleuniv.in/api/netraapi.php?college=KMIT', {
        method: method,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Origin': 'http://kmit-netra.teleuniv.in',
          'Referer': 'http://kmit-netra.teleuniv.in/'
        }
      });

      const attendanceData = response.data
      const estd = (await getData())[0]
      // let presentSessions =0 
      // let absentSessions = 0

      // if (!estd.todayPercentage || !id ){

      //   let x = 0
      //   for (const day in attendanceData.attendance.dayobjects){
      //     if (day.holiday){
      //       x=x+1
      //     }
      //     else{
      //       presentSessions = countPresentSessions(day)
      //       absentSessions = countAbsentSessions(day)
      //     }
      //   }
      //   let y=x+1
      //   let wow= attendanceData.attendance.dayobjects.slice(y)
      //   for (const day in wow){
      //     if (day.holiday){
      //       x=x+1
      //     }
      //     else{
      //       break
      //     }
      //   }

      //   await insertRow({
      //     id:1,
      //     todayPercentage: parseFloat(attendanceData.overallattperformance.totalpercentage),
      //     todayDay: attendanceData.attendance.dayobjects[0].date
      //   })

      //   
      // }
      // else if(!estd.yesterdayDay || ! estd.yesterdayPercentage){
      //   res.json({
      //   success: false,
      //   message: "Does not have yesteraday data"
      // });
      // }
      // else{

      // }
      res.json({
          success: false,
          message: "Does not have any Data, give it some time"
        });

    } catch (error) {
      console.error('Error fetching attendance data from external API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router