import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "../TransactionTable/styles";

export function TransactionTable() {

    useEffect(() => {
        api.get('/transactions').then(data => console.log(data.data));

    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Desenvolvimento de website</td>
                        <td className="deposit">R$ 12.000</td>
                        <td>Desenvolvimento</td>
                        <td>20/02/2021</td>
                    </tr>
                    <tr>
                        <td>Amazin</td>
                        <td className="withdrawn">- R$ 1.000</td>
                        <td>Host</td>
                        <td>10/02/2021</td>
                    </tr>
                    <tr>
                        <td>Desenvolvimento de website</td>
                        <td className="deposit">R$ 12.000</td>
                        <td>Desenvolvimento</td>
                        <td>20/02/2021</td>
                    </tr>
                    <tr>
                        <td>Burg</td>
                        <td className="withdrawn">- R$ 45,00</td>
                        <td>Alimentação</td>
                        <td>10/02/2021</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}