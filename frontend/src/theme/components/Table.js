import styled from "styled-components/macro";

export const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
`;

export const TableRow = styled.tr``;
export const TableHeader = styled.thead``;
export const TableBody = styled.tbody``;

export const TableHeaderColumn = styled.th`
  color: #9aa0ac;
  text-transform: uppercase;
  font-weight: 400;
  text-align: left;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #dee2e6;

  &:first-child {
    padding-left: 0.5em;
  }

  &:last-child {
    padding-right: 0.5em;
  }
`;

export const TableRowColumn = styled.td`
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  &:first-child {
    padding-left: 0.5em;
  }

  &:last-child {
    padding-right: 0.5em;
  }
`;
