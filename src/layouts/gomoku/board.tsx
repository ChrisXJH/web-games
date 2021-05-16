/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const CELL_SIZE = 28;
const CLICKABLE_SIZE = 15;

type GomokuBoardProps = {
  grid: string[][];
  onCellClick: (i: number, j: number) => any;
};

const useStyles = makeStyles({
  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  cell: {
    position: 'relative',
    padding: 0,
    height: `${CELL_SIZE}px`,
    width: `${CELL_SIZE}px`,
    border: '1px solid #555',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(241, 236, 211)'
  },
  clickable: {
    display: 'inline-block',
    position: 'absolute',
    top: `-${(CLICKABLE_SIZE + 1) / 2}px`,
    left: `-${(CLICKABLE_SIZE + 1) / 2}px`,
    height: `${CLICKABLE_SIZE}px`,
    width: `${CLICKABLE_SIZE}px`,
    border: '1px solid transparent',
    borderRadius: '50%',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },
  clickableWhite: {
    border: '1px solid #444',
    backgroundColor: '#fff'
  },
  clickableBlack: {
    border: '1px solid #444',
    backgroundColor: '#000'
  }
});

const GomokuBoard = (props: GomokuBoardProps) => {
  const { grid, onCellClick } = props;
  const classes = useStyles();

  if (!grid || grid.length === 0) {
    return <Typography>Failed to load game grid</Typography>;
  }

  const cellClassNameMap: { [key: string]: string } = {
    B: `${classes.clickable} ${classes.clickableBlack}`,
    W: `${classes.clickable} ${classes.clickableWhite}`,
    U: classes.clickable
  };

  const board = (
    <tbody>
      <tr>
        {new Array(grid[0].length + 1).fill(null).map((c, j) => <td key={`comp-col-${j}`} className={classes.cell} />)}
      </tr>
      {grid.map((row, i) => (
        <tr key={`row-${i}`}>
          <td className={classes.cell} />
          {row.map((cell, j) => (
            <td
              key={`cell-${i}-${j}`}
              className={classes.cell}
            >
              <span className={cellClassNameMap[cell] ?? ''} onClick={() => onCellClick(i, j)} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table className={classes.table}>
      {board}
    </table>
  );
};

export default GomokuBoard;
