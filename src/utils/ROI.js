export const getGroupCoreWellnessPrograms = (sessionPerMonth, peoplePerSession, pricePerSession) => { 
    if(sessionPerMonth < 50 || sessionPerMonth > 5000) {
        return { error: "sessionPerMonth must be between 50 and 5000" };
    }

    if(peoplePerSession < 1 || peoplePerSession > 30) {
        return { error: "peoplePerSession must be between 1 and 30" };
    }

    if(pricePerSession < 10 || pricePerSession > 100) {
        return { error: "pricePerSession must be between 10 and 100" };
    }
    const monthlyRevenue = sessionPerMonth * peoplePerSession * pricePerSession
    return {
        monthlyRevenue: monthlyRevenue,
        yearlyRevenue: monthlyRevenue * 12,
    }
}
// console.log(getGroupCoreWellnessPrograms(94,6,60))

export const getDirectProductSales = (avgRevenuePerQiCoil, qiCoilSystemsSold) => {
    if(qiCoilSystemsSold < 0 || qiCoilSystemsSold > 200) {
        return { error: "qiCoilSystemsSold must be between 0 and 200" };
    }
    const revenue = avgRevenuePerQiCoil * qiCoilSystemsSold
    const monthlyRevenueDirect = revenue * 0.2
    return {
        monthlyRevenueDirect: monthlyRevenueDirect,
        yearlyRevenueDirect: monthlyRevenueDirect * 12,
    }
}

// console.log(getDirectProductSales(2440,20,48800))
export const referalCommissions = ( numberOfAffiliate, commissionOverridePerAffiliate) => {
    console.log(  numberOfAffiliate, commissionOverridePerAffiliate,)
  if (numberOfAffiliate < 0 || numberOfAffiliate > 500) {
    return { error: 'numberOfAffiliate must be between 0 and 500' };
  }
  if (
    commissionOverridePerAffiliate < 10 ||
    commissionOverridePerAffiliate > 200
  ) {
    return {
      error: 'commissionOverridePerAffiliate must be between 10 and 200',
    };
  }
  const monthlyReferalCommissions = numberOfAffiliate * commissionOverridePerAffiliate;
  return {
    monthlyReferalCommissions: monthlyReferalCommissions,
    yearlyReferalCommissions: (monthlyReferalCommissions * 12),
  };
};
// console.log(referalCommissions(20, 50));

export const getQuiCoilRentals = (rentals, pricePerRental) =>{
    if(rentals < 0 || rentals > 100) {
        return { error: "rentals must be between 0 and 100" };
    }
    if(pricePerRental < 200 || pricePerRental > 1000) {
        return { error: "pricePerRental must be between 200 and 1000" };
    }
    const monthlyRevenue = rentals * pricePerRental
    return {
        monthlyRevenueQuiCoil: monthlyRevenue,
        yearlyRevenueQuiCoil:monthlyRevenue * 12,
    }
}
// console.log(getQuiCoilRentals(10,400))

export const getQuantumImmersionFilmRentals = (ticketSold, pricePerTicket) =>{
    if(ticketSold < 0 || ticketSold > 500) {
        return { error: "ticketSold must be between 0 and 500" };
    }
    if(pricePerTicket < 30 || pricePerTicket > 100) {
        return { error: "pricePerTicket must be between 30 and 100" };
    }
    const monthlyRevenue = ticketSold * pricePerTicket
    return {
        monthlyRevenueQuantum: monthlyRevenue,
        yearlyRevenueQuantum:monthlyRevenue * 12,
    }
}

// console.log(getQuantumImmersionFilmRentals(200,35))


export const getUnlimitedAccessMemberships = (newMemberPerMonth, pricePerMembership) => {
    if (newMemberPerMonth < 0 || newMemberPerMonth > 50) {
      return { error: "newMemberPerMonth must be between 0 and 50" };
    }
  
    if (pricePerMembership < 300 || pricePerMembership > 1500) {
      return { error: "pricePerMembership must be between 300 and 1500" };
    }
  
    let currentStudents = newMemberPerMonth;
    let yearlyRevenue = currentStudents * pricePerMembership;
    let revenueOnMonth12 = 0;
  
    for (let n = 1; n < 12; n++) {
      currentStudents = currentStudents + newMemberPerMonth - currentStudents * 0.1;
      let monthRevenue = currentStudents * pricePerMembership;
      yearlyRevenue += monthRevenue;
  
      if (n === 11) {
        revenueOnMonth12 = monthRevenue;
      }
    }
  
    return {    
        revenueOnMonth12: parseFloat(revenueOnMonth12.toFixed(2)),
        yearlyRevenueUnlimit: parseFloat(yearlyRevenue.toFixed(2)),
    };
}

// console.log(getUnlimitedAccessMemberships(10,71,600));


export const getSessionBundles = (bundlesSold, pricePerBundle) => {
    if(bundlesSold < 0 || bundlesSold > 50) {
        return { error: "bundlesSold must be between 0 and 50" };
    }
    if(pricePerBundle < 300 || pricePerBundle > 1500) {
        return { error: "pricePerBundle must be between 300 and 1500" };
    }
    const monthlyRevenue = bundlesSold * pricePerBundle
    return {
        monthlyRevenueSessionBundles: monthlyRevenue,
        yearlyRevenueSessionBundles: monthlyRevenue * 12,
    }
}

// console.log(getSessionBundles(20,600))


export const getAnnualOverhead = (overhead) => {
    if(overhead < 99 || overhead > 30000) {
        return { error: "monthlyOverhead must be between 99 and 30000" };
    }
    const resultMonthlyOverhead = overhead * 12
    return resultMonthlyOverhead
}
export const getResultRoiCalculator = (initialInvestment, annualOverhead, annualRevenue, expectedLifeTime) => {
    console.log("annualRevenue", annualRevenue)
    if(initialInvestment < 30000 || initialInvestment > 500000) {
        return { error: "initialInvestment must be between 30000 and 500000" };
    }
    const annualProfit = annualRevenue-annualOverhead
    const annualRoi = ((annualProfit / initialInvestment)*100).toFixed(2)
    const expectedLifeTimeRevenue = (annualProfit*expectedLifeTime).toFixed(2)
    const lifeRoi = ((expectedLifeTimeRevenue/initialInvestment)*100).toFixed(2)
    return {
        annualProfit,
        annualRoi,
        expectedLifeTimeRevenue,
        lifeRoi,
    }
}
// console.log(getResultRoiCalculator(120000,132000,684063.95,20))
