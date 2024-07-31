import React, { useState, useEffect, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';

const fenPositions = [
  'bqnbnrkr/pppppppp/8/8/8/8/PPPPPPPP/BQNBNRKR w KQkq - 1',
  'bqnnrbkr/pppppppp/8/8/8/8/PPPPPPPP/BQNNRBKR w KQkq - 2',
  'bqnnrkrb/pppppppp/8/8/8/8/PPPPPPPP/BQNNRKRB w KQkq - 3',
  'qbbnnrkr/pppppppp/8/8/8/8/PPPPPPPP/QBBNNRKR w KQkq - 4',
  'qnbbnrkr/pppppppp/8/8/8/8/PPPPPPPP/QNBBNRKR w KQkq - 5',
  'qnbnrbkr/pppppppp/8/8/8/8/PPPPPPPP/QNBNRBKR w KQkq - 6',
  'qnbnrkrb/pppppppp/8/8/8/8/PPPPPPPP/QNBNRKRB w KQkq - 7',
  'qbnnbrkr/pppppppp/8/8/8/8/PPPPPPPP/QBNNBRKR w KQkq - 8',
  'qnnbbrkr/pppppppp/8/8/8/8/PPPPPPPP/QNNBBRKR w KQkq - 9',
  'qnnrbbkr/pppppppp/8/8/8/8/PPPPPPPP/QNNRBBKR w KQkq - 10',
  'qnnrbkrb/pppppppp/8/8/8/8/PPPPPPPP/QNNRBKRB w KQkq - 11',
  'qbnnrkbr/pppppppp/8/8/8/8/PPPPPPPP/QBNNRKBR w KQkq - 12',
  'qnnbrkbr/pppppppp/8/8/8/8/PPPPPPPP/QNNBRKBR w KQkq - 13',
  'qnnrkbbr/pppppppp/8/8/8/8/PPPPPPPP/QNNRKBBR w KQkq - 14',
  'qnnrkrbb/pppppppp/8/8/8/8/PPPPPPPP/QNNRKRBB w KQkq - 15',
  'bbnqnrkr/pppppppp/8/8/8/8/PPPPPPPP/BBNQNRKR w KQkq - 16',
  'bnqbnrkr/pppppppp/8/8/8/8/PPPPPPPP/BNQBNRKR w KQkq - 17',
  'bnqnrbkr/pppppppp/8/8/8/8/PPPPPPPP/BNQNRBKR w KQkq - 18',
  'bnqnrkrb/pppppppp/8/8/8/8/PPPPPPPP/BNQNRKRB w KQkq - 19',
  'nbbqnrkr/pppppppp/8/8/8/8/PPPPPPPP/NBBQNRKR w KQkq - 20',
  'nqbbnrkr/pppppppp/8/8/8/8/PPPPPPPP/NQBBNRKR w KQkq - 21',
  'nqbnrbkr/pppppppp/8/8/8/8/PPPPPPPP/NQBNRBKR w KQkq - 22',
  'nqbnrkrb/pppppppp/8/8/8/8/PPPPPPPP/NQBNRKRB w KQkq - 23',
  'nbqnbrkr/pppppppp/8/8/8/8/PPPPPPPP/NBQNBRKR w KQkq - 24',
  'nqnbbrkr/pppppppp/8/8/8/8/PPPPPPPP/NQNBBRKR w KQkq - 25',
  'nqnrbbkr/pppppppp/8/8/8/8/PPPPPPPP/NQNRBBKR w KQkq - 26',
  'nqnrbkrb/pppppppp/8/8/8/8/PPPPPPPP/NQNRBKRB w KQkq - 27',
  'nbqnrkbr/pppppppp/8/8/8/8/PPPPPPPP/NBQNRKBR w KQkq - 28',
  'nqnbrkbr/pppppppp/8/8/8/8/PPPPPPPP/NQNBRKBR w KQkq - 29',
  'nqnrkbbr/pppppppp/8/8/8/8/PPPPPPPP/NQNRKBBR w KQkq - 30',
  'nqnrkrbb/pppppppp/8/8/8/8/PPPPPPPP/NQNRKRBB w KQkq - 31',
  'bbnnqrkr/pppppppp/8/8/8/8/PPPPPPPP/BBNNQRKR w KQkq - 32',
  'bnnbqrkr/pppppppp/8/8/8/8/PPPPPPPP/BNNBQRKR w KQkq - 33',
  'bnnqrbkr/pppppppp/8/8/8/8/PPPPPPPP/BNNQRBKR w KQkq - 34',
  'bnnqrkrb/pppppppp/8/8/8/8/PPPPPPPP/BNNQRKRB w KQkq - 35',
  'nbbnqrkr/pppppppp/8/8/8/8/PPPPPPPP/NBBNQRKR w KQkq - 36',
  'nnbbqrkr/pppppppp/8/8/8/8/PPPPPPPP/NNBBQRKR w KQkq - 37',
  'nnbqrbkr/pppppppp/8/8/8/8/PPPPPPPP/NNBQRBKR w KQkq - 38',
  'nnbqrkrb/pppppppp/8/8/8/8/PPPPPPPP/NNBQRKRB w KQkq - 39',
  'nbnqbrkr/pppppppp/8/8/8/8/PPPPPPPP/NBNQBRKR w KQkq - 40',
  'rkbbqrnn/pppppppp/8/8/8/8/PPPPPPPP/RKBBQRNN w KQkq - 901',
  'rkbqrbnn/pppppppp/8/8/8/8/PPPPPPPP/RKBQRBNN w KQkq - 902',
  'rkbqrnnb/pppppppp/8/8/8/8/PPPPPPPP/RKBQRNNB w KQkq - 903',
  'rbkqbrnn/pppppppp/8/8/8/8/PPPPPPPP/RBKQBRNN w KQkq - 904',
  'rkqbbrnn/pppppppp/8/8/8/8/PPPPPPPP/RKQBBRNN w KQkq - 905',
  'rkqrbbnn/pppppppp/8/8/8/8/PPPPPPPP/RKQRBBNN w KQkq - 906',
  'rkqrbnnb/pppppppp/8/8/8/8/PPPPPPPP/RKQRBNNB w KQkq - 907',
  'rbkqrnbn/pppppppp/8/8/8/8/PPPPPPPP/RBKQRNBN w KQkq - 908',
  'rkqbrnbn/pppppppp/8/8/8/8/PPPPPPPP/RKQBRNBN w KQkq - 909',
  'rkqrnbbn/pppppppp/8/8/8/8/PPPPPPPP/RKQRNBBN w KQkq - 910',
  'rkqrnnbb/pppppppp/8/8/8/8/PPPPPPPP/RKQRNNBB w KQkq - 911',
  'bbrkrqnn/pppppppp/8/8/8/8/PPPPPPPP/BBRKRQNN w KQkq - 912',
  'brkbrqnn/pppppppp/8/8/8/8/PPPPPPPP/BRKBRQNN w KQkq - 913',
  'brkrqbnn/pppppppp/8/8/8/8/PPPPPPPP/BRKRQBNN w KQkq - 914',
  'brkrqnnb/pppppppp/8/8/8/8/PPPPPPPP/BRKRQNNB w KQkq - 915',
  'rbbkrqnn/pppppppp/8/8/8/8/PPPPPPPP/RBBKRQNN w KQkq - 916',
  'rkbbrqnn/pppppppp/8/8/8/8/PPPPPPPP/RKBBRQNN w KQkq - 917',
  'rkbrqbnn/pppppppp/8/8/8/8/PPPPPPPP/RKBRQBNN w KQkq - 918',
  'rkbrqnnb/pppppppp/8/8/8/8/PPPPPPPP/RKBRQNNB w KQkq - 919',
  'rbkrbqnn/pppppppp/8/8/8/8/PPPPPPPP/RBKRBQNN w KQkq - 920',
  'rkrbbqnn/pppppppp/8/8/8/8/PPPPPPPP/RKRBBQNN w KQkq - 921',
  'rkrqbbnn/pppppppp/8/8/8/8/PPPPPPPP/RKRQBBNN w KQkq - 922',
  'rkrqbnnb/pppppppp/8/8/8/8/PPPPPPPP/RKRQBNNB w KQkq - 923',
  'rbkrqnbn/pppppppp/8/8/8/8/PPPPPPPP/RBKRQNBN w KQkq - 924',
  'rkrbqnbn/pppppppp/8/8/8/8/PPPPPPPP/RKRBQNBN w KQkq - 925',
  'rkrqnbbn/pppppppp/8/8/8/8/PPPPPPPP/RKRQNBBN w KQkq - 926',
  'rkrqnnbb/pppppppp/8/8/8/8/PPPPPPPP/RKRQNNBB w KQkq - 927',
  'bbrkrnqn/pppppppp/8/8/8/8/PPPPPPPP/BBRKRNQN w KQkq - 928',
  'brkbrnqn/pppppppp/8/8/8/8/PPPPPPPP/BRKBRNQN w KQkq - 929',
  'brkrnbqn/pppppppp/8/8/8/8/PPPPPPPP/BRKRNBQN w KQkq - 930',
  'brkrnqnb/pppppppp/8/8/8/8/PPPPPPPP/BRKRNQNB w KQkq - 931',
  'rbbkrnqn/pppppppp/8/8/8/8/PPPPPPPP/RBBKRNQN w KQkq - 932',
  'rkbbrnqn/pppppppp/8/8/8/8/PPPPPPPP/RKBBRNQN w KQkq - 933',
  'rkbrnbqn/pppppppp/8/8/8/8/PPPPPPPP/RKBRNBQN w KQkq - 934',
  'rkbrnqnb/pppppppp/8/8/8/8/PPPPPPPP/RKBRNQNB w KQkq - 935',
  'rbkrbnqn/pppppppp/8/8/8/8/PPPPPPPP/RBKRBNQN w KQkq - 936',
  'rkrbbnqn/pppppppp/8/8/8/8/PPPPPPPP/RKRBBNQN w KQkq - 937',
  'rkrnbbqn/pppppppp/8/8/8/8/PPPPPPPP/RKRNBBQN w KQkq - 938',
  'rkrnbqnb/pppppppp/8/8/8/8/PPPPPPPP/RKRNBQNB w KQkq - 939',
  'rbkrnqbn/pppppppp/8/8/8/8/PPPPPPPP/RBKRNQBN w KQkq - 940',
  'rkrbnqbn/pppppppp/8/8/8/8/PPPPPPPP/RKRBNQBN w KQkq - 941',
  'rkrnqbbn/pppppppp/8/8/8/8/PPPPPPPP/RKRNQBBN w KQkq - 942',
  'rkrnqnbb/pppppppp/8/8/8/8/PPPPPPPP/RKRNQNBB w KQkq - 943',
  'bbrkrnnq/pppppppp/8/8/8/8/PPPPPPPP/BBRKRNNQ w KQkq - 944',
  'brkbrnnq/pppppppp/8/8/8/8/PPPPPPPP/BRKBRNNQ w KQkq - 945',
  'brkrnbnq/pppppppp/8/8/8/8/PPPPPPPP/BRKRNBNQ w KQkq - 946',
  'brkrnnqb/pppppppp/8/8/8/8/PPPPPPPP/BRKRNNQB w KQkq - 947',
  'rbbkrnnq/pppppppp/8/8/8/8/PPPPPPPP/RBBKRNNQ w KQkq - 948',
  'rkbbrnnq/pppppppp/8/8/8/8/PPPPPPPP/RKBBRNNQ w KQkq - 949',
  'rkbrnbnq/pppppppp/8/8/8/8/PPPPPPPP/RKBRNBNQ w KQkq - 950',
  'rkbrnnqb/pppppppp/8/8/8/8/PPPPPPPP/RKBRNNQB w KQkq - 951',
  'rbkrbnnq/pppppppp/8/8/8/8/PPPPPPPP/RBKRBNNQ w KQkq - 952',
  'rkrbbnnq/pppppppp/8/8/8/8/PPPPPPPP/RKRBBNNQ w KQkq - 953',
  'rkrnbbnq/pppppppp/8/8/8/8/PPPPPPPP/RKRNBBNQ w KQkq - 954',
  'rkrnbnqb/pppppppp/8/8/8/8/PPPPPPPP/RKRNBNQB w KQkq - 955',
  'rbkrnnbq/pppppppp/8/8/8/8/PPPPPPPP/RBKRNNBQ w KQkq - 956',
  'rkrbnnbq/pppppppp/8/8/8/8/PPPPPPPP/RKRBNNBQ w KQkq - 957',
  'rkrnnbbq/pppppppp/8/8/8/8/PPPPPPPP/RKRNNBBQ w KQkq - 958',
  'rkrnnqbb/pppppppp/8/8/8/8/PPPPPPPP/RKRNNQBB w KQkq - 959',
];
function ChessFENDisplay() {
  const [currentFEN, setCurrentFEN] = useState(fenPositions[0]);
  const [interval, setInterval] = useState(3000);

  const displayRandomPosition = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fenPositions.length);
    setCurrentFEN(fenPositions[randomIndex]);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(displayRandomPosition, interval);
    return () => clearInterval(intervalId);
  }, [interval, displayRandomPosition]);

  const handleIntervalChange = (e) => {
    setInterval(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>Chess FEN Display</h1>
      <select onChange={handleIntervalChange} value={interval}>
        <option value="3000">3 seconds</option>
        <option value="1000">1 second</option>
        <option value="500">0.5 seconds</option>
        <option value="250">0.25 seconds</option>
      </select>
      <p>{currentFEN}</p>
      <div style={{ width: '400px', height: '400px' }}>
        <Chessboard position={currentFEN.split(' ')[0]} />
      </div>
    </div>
  );
}

export default ChessFENDisplay;
