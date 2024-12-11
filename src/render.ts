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
  const transactionHistoryLines = transactions.map(transaction =>
    `Date: ${transaction.date}, Amount: ${transaction.amount}, Type: ${transaction.type}`
  );
  return `Transaction History:\n${transactionHistoryLines.join('\n')}`;
};

export const renderNotifications = (notifications: Notification[]): string => {
  const notificationLines = notifications.map(notification =>
    `Message: ${notification.message}, Timestamp: ${notification.timestamp.toLocaleString()}`
  );
  return `Notifications:\n${notificationLines.join('\n')}`;
};