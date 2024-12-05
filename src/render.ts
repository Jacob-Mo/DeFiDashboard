import { config } from "dotenv";
config();

interface Dashboard {
  welcomeMessage: string;
  summary: object;
}

interface Transaction {
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface Notification {
  message: string;
  timestamp: Date;
}

export const renderDashboard = (dashboardData: Dashboard): string => {
  const { welcomeMessage, summary } = dashboardData;
  return `Dashboard: ${welcomeMessage}, Summary: ${JSON.stringify(summary)}`;
};

export const renderTransactionHistory = (transactions: Transaction[]): string => {
  let transactionHistory = "Transaction History:\n";
  transactions.forEach((transaction) => {
    transactionHistory += `Date: ${transaction.date}, Amount: ${transaction.amount}, Type: ${transaction.type}\n`;
  });
  return transactionHistory;
};

export const renderNotifications = (notifications: Notification[]): string => {
  let notificationOutput = "Notifications:\n";
  notifications.forEach((notification) => {
    notificationOutput += `Message: ${notification.message}, Timestamp: ${notification.timestamp.toLocaleString()}\n`;
  });
  return notificationOutput;
};
