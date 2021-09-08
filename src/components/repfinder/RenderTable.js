import React from 'react';
import {
    Table,
} from 'reactstrap';
import { Container } from 'react-bootstrap';

function RenderTable(props) {
    let head; // header
    if (props.smallerList || props.repsList.length > 0) {
        head = (
            <thead style={{ backgroundColor: 'rgb(239, 245, 247)' }}>
                <tr>
                    <th width='10px' className="photo">Photo</th>
                    <th width='10px' className="name">Name</th>
                    <th width='10px' className="office">Office</th>
                    <th width='10px' className="party">Party</th>
                    <th width='40px' className="web">Website</th>
                    <th width='20px' className="phone">Phone</th>
                </tr>
            </thead>
        );
    }
    return (
        <Container>
            <Table key={'newTable'} responsive style={{ color: 'gray' }} >
                {head}
                <tbody style={{ color: 'gray', backgroundColor: '#efefef' }}>
                    {props.smallerList}
                    {props.repsList}
                </tbody>
            </Table>
        </Container>
    )
};
export default RenderTable; 