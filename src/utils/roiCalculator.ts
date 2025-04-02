export const getGroupCoreWellnessPrograms = (
  sessionPerMonth: number,
  peoplePerSession: number,
  pricePerSession: number
): { monthlyRevenue: number; yearlyRevenue: number } | { error: string } => {
  if (sessionPerMonth < 50 || sessionPerMonth > 5000) {
    return { error: "sessionPerMonth must be between 50 and 5000" };
  }

  if (peoplePerSession < 1 || peoplePerSession > 30) {
    return { error: "peoplePerSession must be between 1 and 30" };
  }

  if (pricePerSession < 10 || pricePerSession > 100) {
    return { error: "pricePerSession must be between 10 and 100" };
  }

  const monthlyRevenue = sessionPerMonth * peoplePerSession * pricePerSession;
  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
  };
};

export const getDirectProductSales = (
  avgRevenuePerQiCoil: number,
  qiCoilSystemsSold: number
): { monthlyRevenue: number; yearlyRevenue: number } | { error: string } => {
  if (qiCoilSystemsSold < 0 || qiCoilSystemsSold > 200) {
    return { error: "qiCoilSystemsSold must be between 0 and 200" };
  }

  const revenue = avgRevenuePerQiCoil * qiCoilSystemsSold;
  const monthlyRevenue = revenue * 0.2;
  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
  };
};

export const getQuiCoilRentals = (rentals: number, pricePerRental: number): { monthlyRevenue: number; yearlyRevenue: number } | { error: string } => {
  if (rentals < 0 || rentals > 100) {
    return { error: "rentals must be between 0 and 100" };
  }
  if (pricePerRental < 200 || pricePerRental > 1000) {
    return { error: "pricePerRental must be between 200 and 1000" };
  }

  const monthlyRevenue = rentals * pricePerRental;
  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
  };
};

export const getQuantumImmersionFilmRentals = (
  ticketSold: number,
  pricePerTicket: number
): { monthlyRevenue: number; yearlyRevenue: number } | { error: string } => {
  if (ticketSold < 0 || ticketSold > 500) {
    return { error: "ticketSold must be between 0 and 500" };
  }
  if (pricePerTicket < 30 || pricePerTicket > 100) {
    return { error: "pricePerTicket must be between 30 and 100" };
  }

  const monthlyRevenue = ticketSold * pricePerTicket;
  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
  };
};

export const getUnlimitedAccessMemberships = (
  newMemberPerMonth: number,
  pricePerMembership: number
): { revenueOnMonth12: number; yearlyRevenue: number } | { error: string } => {
  if (newMemberPerMonth < 0 || newMemberPerMonth > 50) {
    return { error: "newMemberPerMonth must be between 0 and 50" };
  }

  if (pricePerMembership < 300 || pricePerMembership > 1500) {
    return { error: "pricePerMembership must be between 300 and 1500" };
  }

  let currentStudents: number = newMemberPerMonth;
  let yearlyRevenue: number = currentStudents * pricePerMembership;
  let revenueOnMonth12: number = 0;

  for (let n = 1; n < 12; n++) {
    currentStudents = currentStudents + newMemberPerMonth - currentStudents * 0.1;
    let monthRevenue: number = currentStudents * pricePerMembership;
    yearlyRevenue += monthRevenue;

    if (n === 11) {
      revenueOnMonth12 = monthRevenue;
    }
  }

  return {
    revenueOnMonth12: parseFloat(revenueOnMonth12.toFixed(2)),
    yearlyRevenue: parseFloat(yearlyRevenue.toFixed(2)),
  };
};


export const getSessionBundles = (
  bundlesSold: number,
  pricePerBundle: number
): { monthlyRevenue: number; yearlyRevenue: number } | { error: string } => {
  if (bundlesSold < 0 || bundlesSold > 50) {
    return { error: "bundlesSold must be between 0 and 50" };
  }
  if (pricePerBundle < 300 || pricePerBundle > 1500) {
    return { error: "pricePerBundle must be between 300 and 1500" };
  }

  const monthlyRevenue = bundlesSold * pricePerBundle;
  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
  };
};

export const getAnnualOverhead = (monthlyOverhead: number): number | { error: string } => {
  if (monthlyOverhead < 99 || monthlyOverhead > 30000) {
      return { error: "monthlyOverhead must be between 99 and 30000" };
  }
  return monthlyOverhead * 12;
};

interface RoiResult {
  annualProfit: number;
  annualRoi: string;
  expectedLifeTimeRevenue: string;
  lifeRoi: string;
}

export const getResultRoiCalculator = (
  initialInvestment: number,
  annualOverhead: number,
  annualRevenue: number,
  expectedLifeTime: number
): RoiResult | { error: string } => {
  if (initialInvestment < 30000 || initialInvestment > 500000) {
      return { error: "initialInvestment must be between 30000 and 500000" };
  }

  const annualProfit = annualRevenue - annualOverhead;
  const annualRoi = ((annualProfit / initialInvestment) * 100).toFixed(2);
  const expectedLifeTimeRevenue = (annualProfit * expectedLifeTime).toFixed(2);
  const lifeRoi = ((parseFloat(expectedLifeTimeRevenue) / initialInvestment) * 100).toFixed(2);

  return {
      annualProfit,
      annualRoi,
      expectedLifeTimeRevenue,
      lifeRoi,
  };
};

