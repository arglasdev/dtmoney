import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number,
    title: string,
    value: number,
    category: string,
    type: string,
    createdAt: string
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionInput2 = Pick<Transaction, 'title' | 'value' | 'type' | 'category'>;

interface TransactionProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {

        api.get('/transactions').then(response => setTransactions(response.data.transactions));

    }, []);

    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() });

        const { transaction } = response.data;

        setTransactions([...transactions, transaction,]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {

    const context = useContext(TransactionsContext);

    return context;
}

