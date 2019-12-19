import React from "react";
import styled from "styled-components";

const ShortcutTableWrapper = styled.table`
  border-spacing: 0;
  border: 1px solid grey;
  td {
    border-bottom: 1px solid grey;
    padding-right: 1.5rem;
  }
  border-left: none;
  border-right: none;
`;
const Shortcut = () => {
  return (
    <>
      <h3>Shortcut</h3>
      <ShortcutTableWrapper>
        <thead>
          <tr>
            <td>기능</td>
            <td>윈도우 단축키</td>
            <td>맥OS 단축키</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>모든 셀 선택 </td>
            <td> Ctrl + a </td>
            <td> ⌘ + a</td>
          </tr>
          <tr>
            <td>범위 선택 </td>
            <td> Shift + ↑ </td>
            <td> ⇧ + ↑</td>
          </tr>
          <tr>
            <td>범위 선택 </td>
            <td> Shift + ↓ </td>
            <td> ⇧ + ↓</td>
          </tr>
          <tr>
            <td>범위 잘라내기 </td>
            <td> Ctrl + x </td>
            <td> ⌘ + x</td>
          </tr>
          <tr>
            <td>범위 복사 </td>
            <td> Ctrl + c </td>
            <td> ⌘ + c</td>
          </tr>
          <tr>
            <td>범위 붙여넣기 </td>
            <td> Ctrl + v </td>
            <td> ⌘ + v</td>
          </tr>
          <tr>
            <td>깊이 증가(List) </td>
            <td> Tab </td>
            <td> ⇥</td>
          </tr>
          <tr>
            <td>깊이 감소(List) </td>
            <td> Shift + Tab </td>
            <td> ⇧ + ⇥</td>
          </tr>
          <tr>
            <td>터미널 셀 삭제 </td>
            <td> Shift + Backspace </td>
            <td> ⇧ + ⌫</td>
          </tr>
          <tr>
            <td>터미널 셀, 코드 셀 위로 탈출 </td>
            <td> Ctrl + ↑ </td>
            <td> ⌥ + ⌘ + ↑</td>
          </tr>
          <tr>
            <td>터미널 셀, 코드 셀 아래로 탈출 </td>
            <td> Ctrl + ↓ </td>
            <td> ⌥ + ⌘ + ↓</td>
          </tr>
        </tbody>
      </ShortcutTableWrapper>
    </>
  );
};

export default Shortcut;
