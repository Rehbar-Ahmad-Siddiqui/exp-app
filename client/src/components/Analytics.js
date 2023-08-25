import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ allTransaction }) => {
     
    //category
    const categories = 
    ['salary','business', 'digitalMarketing', 
    'socialMedia', 'trading', 'freelancing', 'projects', 
    'tip', 'food', 'movie', 'bills', 'medicals',
    'shopping', 'grocery', 'houseRent', 'educationFee', 'tax', 'others'];

    // total transaction
    const totalTransaction = allTransaction.length;
    const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income');
    const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense');
    const totalIncomePercent = ( totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent = ( totalExpenseTransactions.length / totalTransaction) * 100; 
     
    // total turnover - use this or below one
    const totalTurnover = allTransaction.reduce(
        (acc, transaction) => acc + transaction.amount, 
        0
        );

    // total Incometurnover
    const totalIncomeTurnover = allTransaction.filter(
        (transaction) => transaction.type === "income"
        ).reduce((acc, transaction) => acc + transaction.amount, 
        0
        );

    // total Expenseturnover
    const totalExpenseTurnover = allTransaction.filter(
        (transaction) => transaction.type === "expense"
        ).reduce((acc, transaction) => acc + transaction.amount, 
        0
    );
    
    // // total turnover - use this or above one
    // const totalTurnover = totalIncomeTurnover- totalExpenseTurnover;
    // //end here of totalTurnover formuale

    const totalIncomeTurnoverPercent = 
    (totalIncomeTurnover/ totalTurnover) * 100;

    const totalExpenseTurnoverPercent =
     (totalExpenseTurnover/ totalTurnover) * 100;


  return (
    <>
        <div className="firstrowstyling row m-3">
            <div className='col-md-4'>
                 <div className='cardstyle1 card'>
                    <div className='card-header'>
                        Total Transactions : {totalTransaction}
                    </div>
                    <div className='card-body'>
                        <h5 className="text-success">Income: { totalIncomeTransactions.length }</h5>
                        <h5 className="text-danger">Expense: { totalExpenseTransactions.length }</h5>
                    </div>
                    <div>
                      <Progress type="circle" 
                      strokeColor={'green'} 
                      className="mx-2" 
                      percent={totalIncomePercent.toFixed(2)}
                      />
                      <Progress type="circle" 
                      strokeColor={'red'} 
                      className="mx-2" 
                      percent={totalExpensePercent.toFixed(2)}
                      />
                    </div>
                 </div>
            </div>
            
            <div className='col-md-4'>
                 <div className='cardstyle2 card'>
                    <div className='card-header'>
                        Total Turnover : {totalTurnover}
                    </div>
                    <div className='card-body'>
                        <h5 className="text-success">
                            Total Income: { totalIncomeTurnover}</h5>
                        <h5 className="text-danger">
                            Total Expense: { totalExpenseTurnover}</h5>
                    </div>
                    <div>
                      <Progress type="circle" 
                      strokeColor={'green'} 
                      className="mx-2" 
                      percent={totalIncomeTurnoverPercent.toFixed(2)}
                      />
                      <Progress type="circle" 
                      strokeColor={'red'} 
                      className="mx-2" 
                      percent={totalExpenseTurnoverPercent.toFixed(2)}
                      />
                    </div>
                 </div>
            </div>


        </div>


        <div className='categoryrowstyle row mt-3'>

        <div className='categoryincomecolstyle col-md-4'>
              <h4 className='categoryincomestyle'>Categorywise Income</h4>
              {
                categories.map(category => {
                    const amount = 
                    allTransaction.filter
                    (transaction => transaction.type === 'income' && transaction.category === category)
                    .reduce((acc,transaction) => acc + transaction.amount,0);
                    return(
                        amount > 0  && 
                        <div className='card'>
                            <div className='card-body'>
                                <h5>{category}</h5>
                                <Progress 
                                percent={((amount/totalIncomeTurnover) * 100).toFixed(2)} />
                            </div>
                        </div>
                    )
                })
              }
            </div>

           <div className='categoryexpensecolstyle col-md-4'>
              <h4 className='categoryexpensestyle'>Categorywise Expense</h4>
              {
                categories.map(category => {
                    const amount = 
                    allTransaction.filter
                    (transaction => transaction.type === 'expense' && transaction.category === category)
                    .reduce((acc,transaction) => acc + transaction.amount,0);
                    return(
                        amount > 0  && 
                        <div className='card'>
                            <div className='card-body'>
                                <h5>{category}</h5>
                                <Progress 
                                percent={((amount/totalExpenseTurnover) * 100).toFixed(2)} />
                            </div>
                        </div>
                    )
                })
              }
           </div>
           

        </div>
    </>
  )
}

export default Analytics;