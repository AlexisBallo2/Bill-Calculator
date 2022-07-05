// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const days = req.body.days;
    const money = req.body.costs;
    return res.status(200).json(makeCalculation(days, money));
  }
}

function makeCalculation(days, money) {
  console.log("days: ", days);
  console.log("money:", money);

  var data = days;
  /*
  = [
      [
          {name:"alexis", days: '5'},
          {name:"joe", days: '1'},
          {name:"chris", days: '1'}
      ],
      [
          {name:"seve", days: '4'}
      ],
      [  
          {name:"smith", days: '5'},
          {name:"carl", days: '1'},
          {name:"j", days: '1'}
      ],
      [  
          {name:"smith", days: '5'},
          {name:"carl", days: '1'},
          {name:"j", days: '1'}
      ]
  ]
  */
  var paid_array = money;
  for (var i = 0; i < paid_array.length; i++) {
    paid_array[i] = -parseInt(paid_array[i]);
  }
  console.log("paid array", paid_array);
  var totalCost = paid_array.reduce((partialSum, a) => partialSum + a, 0);
  console.log("total Cost", totalCost);

  var fam_days_array = [];
  var totalDays = 0;
  for (var i = 0; i < data.length; i++) {
    var fam_days = 0;
    for (var j = 0; j < data[i].length; j++) {
      fam_days += parseInt(data[i][j].days);
      totalDays += parseInt(data[i][j].days);
    }
    fam_days_array[i] = fam_days;
  }

  var dailyCost = Math.round(totalCost / totalDays);
  var fam_cost_array = [];

  for (var i = 0; i < fam_days_array.length; i++) {
    //console.log("fam_days_array")
    fam_cost_array[i] = -(fam_days_array[i] * dailyCost) + paid_array[i];
  }

  console.log("fam days array", fam_days_array);
  console.log("total days total", totalDays);
  console.log("daily cost", dailyCost);
  console.log("cost per fam", fam_cost_array);

  // beginning of the price deal
  var positives = {};
  var negatives = {};
  for (var i = 0; i < paid_array.length; i++) {
    if (fam_cost_array[i] >= 0) {
      positives[i] = fam_cost_array[i];
    } else {
      negatives[i] = fam_cost_array[i];
    }
  }

  ////console.log(Object.entries(positives))
  console.log("negatives", negatives);
  console.log("positives:", positives);
  // postup = [(k, v) for k, v in positives.items()]
  // negup = [(k, v) for k, v in negatives.items()]
  // newnegup = list(negup)
  // newnegup = [list(ele) for ele in newnegup]
  // newpostup = list(postup)
  // newpostup = [list(ele) for ele in newpostup]
  // # print(postup,"\n",negup)
  // test = {tuple(negup): tuple(postup)}

  var newpostup = [];
  for (const [key, value] of Object.entries(positives)) {
    //console.log(`${key}: ${value}`);
    newpostup.push([key, value]);
  }

  var newnegup = [];
  for (const [key, value] of Object.entries(negatives)) {
    //console.log(`${key}: ${value}`);
    newnegup.push([key, value]);
  }

  console.log("newpostup", newpostup);
  console.log("newnegup", newnegup);

  var transactions = [];

  //for each fam that needs money
  for (var a = 0; a < newnegup.length; a++) {
    //for each fam that needs to pay
    for (var x = 0; x < newpostup.length; x++) {
      //if (fam to pay) needs to pay less that the (fam to recieve) and the (fam to pay) still has money to pay
      if (newpostup[x][1] < Math.abs(newnegup[a][1]) && newpostup[x][1] > 0) {
        //(money recieving fam needs) = (previous needed money) - (payment from paying fam)
        newnegup[a][1] = newnegup[a][1] + newpostup[x][1];
        //log payment
        console.log(
          newpostup[x][0],
          " pay ",
          newnegup[a][0],
          ": ",
          newpostup[x][1]
        );
        transactions.push([newpostup[x][0], newnegup[a][0], newpostup[x][1]]);
        // reset the fams pay
        newpostup[x][1] = 0;
      }
    }
  }
  //for each fam that still needs to pay
  for (var y = 0; y < newpostup.length; y++) {
    //if still needs to pay up
    if (newpostup[y][1] > 0) {
      //print(newpostup[y][1])
      //for each fam to recieve...
      for (var z = 0; z < newnegup.length; z++) {
        //if still needs to recieve
        if (Math.abs(newnegup[z][1]) > 0) {
          //left required payment = payment - amount paid to reciever
          newpostup[y][1] = newpostup[y][1] + newnegup[z][1];
          console.log(
            newpostup[y][0],
            " pay ",
            newnegup[z][0],
            ": ",
            Math.abs(newnegup[z][1])
          );
          transactions.push([
            newpostup[y][0],
            newnegup[z][0],
            Math.abs(newnegup[z][1]),
          ]);
          //reciever is now satisfied
          newnegup[z][1] = 0;
        }
      }
    }

    newpostup[y][1] = 0;
  }

  console.log("transactions: ", transactions);
  return transactions;
  /*
  print('\n\n\n\n\n')
  print("final nenegup" , newnegup)
  print("final postup" , newpostup)

  console.log("positives", positives)
  console.log("negatives", negatives)

  */
}
