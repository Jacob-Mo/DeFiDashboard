import { config } from "dotenv";
config();

interface Dashboard {
  welcomeMessage: string;
  summary: object;  // Consider using a more specific type than 'object' for better type checking.
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
  // Directly destructuring in the function's parameter to slightly reduce code verbosity.
  const { welcomeMessage, summary } = dashboardData;
  // Using template literal directly in return statement.
  return `Dashboard: ${welcomeMessage}, Summary: ${JSON.stringify(summary)}`;
};

export const renderTransactionHistory = (transactions: Transaction[]): string => {
  const transactionHistoryLines = transactions.map(({ date, amount, type }) =>
    `Date: ${date}, Amount: ${amount}, Type: ${type}`
  );
  return `Transaction History:\n${transactionHistoryLines.join('\n')}`;
};

export const renderNotifications = (notifications: Notification[]): string => {
  const notificationLines = notifications.map(({ message, timestamp }) =>
    `Message: ${message}, Timestamp: ${timestamp.toLocaleString()}`
  );
  // Direct usage in return statement
  return `Notifications:\n${notificationLines.join('\n')}`;
};
