const csv = require('csv-parser');
const fs = require('fs');
const { parse } = require('json2csv');

const filePath = 'data.csv'

function countPresentSessions(data) {
  const sessions = data.sessions;
  let count = 0;
  for (const key in sessions) {
    if (sessions[key] === "1") {
      count++;
    }
  }
  return count;
}

function countAbsentSessions(data) {
  const sessions = data.sessions;
  let count = 0;
  for (const key in sessions) {
    if (sessions[key] === "0") {
      count++;
    }
  }
  return count;
}

// async function getApiData(){
//       try {
//         const resp = await axios.post("https://spectraserver-indol.vercel.app/api/def-token",{id: "67c1b750d9d50f71141aa1e0"},{headers:{
//           'Content-Type':'application/json'
//         }});
//         const token = resp.data.token;
//         !token && console.log('Token not found')
        
//         const response = await axios.post('http://apps.teleuniv.in/api/netraapi.php?college=KMIT', {
//           method: method,
//         }, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Origin': 'http://kmit-netra.teleuniv.in',
//             'Referer': 'http://kmit-netra.teleuniv.in/'
//           }
//         });
  
//         const attendanceData = response.data
//         return(attendanceData);
  
//       } catch (error) {
//         console.error('Error fetching attendance data from external API:', error);
//         return ({
//           success: 0
//         })
//       };
    
// }

// async function addLastDay(){

//   const data = await getApiData()

//   const percentage = parseFloat(data.overallattperformance.totalpercentage)
//   const present = countPresentSessions(data.attendance.dayobjects[0])
//   const absent = countAbsentSessions(data.attendance.dayobjects[0])
//   const sessions =  7-present-absent
//   const date = data.attendance.dayobjects[0].date
//   let last = getData()
//   last = last[last.length -1]
//   if(last.date == date){
//     return {
//       success: false
//     }
//   }

//   const newData = {
//     percentage: percentage,
//     present,
//     absent,
//     sessions,
//     date
//   }
  
//   await insertRow(newData)

//   return {
//     success: true,
//   }
// }

function getData() {
  // read entire file
  const content = fs.readFileSync(filePath, 'utf8');
  // split into lines and remove any empty trailing line
  const lines = content.trim().split('\n');
  // first line is header
  const headers = lines.shift().split(',');
  
  // map each remaining line into an object
  return lines.map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i];
    });
    return obj;
  });
}


// export async function getEstimate(){
  const data = getData()
  console.log(data)
  if(data.length > 2)
  {
    const l = data.length
    const d1 = data[l-1]
    const d2 = data[l-2]
    const p1 = parseFloat(d1.percentage) / 100;
    const p2 = parseFloat(d2.percentage) /100;
    const a = parseFloat(d1.present)
    const b = parseFloat(d2.present)

    const estimate = (p1(a+b) -a)/(p2-p1) * 100
    console.log(estimate)
  }
//   else{
//     return {
//       success: false,
//       message: "not enough data to estimate"
//     }
//   }
// }

// export async function deleteRow(id) {
//   const data = await getData();
//   const filtered = data.filter(row => row.id !== id); // Adjust 'id' field as needed
//   const csvString = parse(filtered);
//   fs.writeFileSync(filePath, csvString);
// }



// export async function insertRow(newRow) {
//   const data = await getData();

//   // Find the max existing ID and add 1
//   const maxId = data.reduce((max, row) => {
//     const currentId = parseInt(row.id, 10);
//     return isNaN(currentId) ? max : Math.max(max, currentId);
//   }, 0);

//   const newId = maxId + 1;
//   const rowWithId = { id: newId.toString(), ...newRow };

//   data.push(rowWithId);

//   const csvString = parse(data);
//   fs.writeFileSync(filePath, csvString);
// }
