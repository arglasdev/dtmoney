import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactionContext';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTransactions();

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {

        event.preventDefault();

        await createTransaction({
            category,
            title,
            type,
            value
        });

        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');

        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">

            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação </h2>

                <input type="text"
                    placeholder="Título"
                    value={title}
                    onChange={event =>
                        setTitle(event.target.value)}
                />

                <input type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>

                    <RadioBox type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor='green'

                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox type="button"
                        onClick={() => { setType('withdrawn') }}
                        isActive={type === 'withdrawn'}
                        activeColor='red'>
                        <img src={outcomeImg} alt="Saída" />
                        <span>Entrada</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)} />

                <button type="submit">Cadastrar</button>

            </Container>
        </Modal>

    );
}