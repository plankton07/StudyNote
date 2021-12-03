// 입력값 〉	[44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]
// 기댓값 〉	[3, 5]

function solution(lottos, win_nums) {
    let minRank = 6;
    let maxRank = 1;
    // 0이 6개면 1등
    const unknownNumbers = lottos.filter(number => number == 0);
    if (unknownNumbers.length == 6) {
        return [maxRank, minRank]
    }
    // { 맞춘 갯수 : 등수 }
    const rankInfo = { 6:1, 5:2, 4:3, 3:4, 2:5, 1:6, 0:6 };
    let winNumbers = 0;
    for (const winNum of win_nums) {
        if (lottos.indexOf(winNum) != -1) {
            winNumbers += 1;
        }
    }

    // 최고등수
    maxRank = rankInfo[winNumbers + unknownNumbers.length];
    // 최하등수
    minRank = rankInfo[winNumbers];


    return [maxRank, minRank];
}

console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]))
console.log(solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]))
