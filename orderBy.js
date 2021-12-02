const _ = require('lodash');

// const infos = [
//     JSON.stringify({AccountValue:1,Score:100,BattleTime:10,RegTime:1625727726}),
//     JSON.stringify({AccountValue:2,Score:100,BattleTime:10,RegTime:1625727726}),
//     JSON.stringify({AccountValue:3,Score:100,BattleTime:10,RegTime:1625727726}),
//     JSON.stringify({AccountValue:4,Score:100,BattleTime:10,RegTime:1625727726}),
//     JSON.stringify({AccountValue:5,Score:100,BattleTime:10,RegTime:2625727783}),
//     JSON.stringify({AccountValue:6,Score:100,BattleTime:15,RegTime:1625727780}),
//     JSON.stringify({AccountValue:7,Score:100,BattleTime:15,RegTime:1625727726}),
//     ];
//
//
// //console.log(infos);
//
// const paseInfo = _.map(infos, _.ary(JSON.parse));
// console.log(paseInfo);
//
// console.log('---------------------------------------');
// console.log(_.orderBy(paseInfo, ['BattleTime', 'RegTime', 'AccountValue'], ['asc','desc','asc']));

const rankerInfos = [
    // {AccountValue:1, Score:300, Rank:1, BattleTime:23,RegTime:1625727726},
    // {AccountValue:2, Score:300, Rank:2, BattleTime:12,RegTime:1625727726},
    // {AccountValue:3, Score:100, Rank:3, BattleTime:11,RegTime:1625727726},
    // {AccountValue:4, Score:100, Rank:4, BattleTime:10,RegTime:1625727726},
    // {AccountValue:5, Score:100, Rank:5, BattleTime:10,RegTime:1625727726},
    // {AccountValue:6, Score:100, Rank:6, BattleTime:10,RegTime:2625848726},
    // {AccountValue:7, Score:50, Rank:7, BattleTime:11,RegTime:1625727726},
    {"AccountValue":"68872","Score":4500,"BattleTime":23400,"RegTime":1627561567, "Rank":1},
    {"AccountValue":"67714","Score":4500,"BattleTime":23600,"RegTime":1627561904, "Rank":2},
    {"AccountValue":"68872:44744","Score":4500,"BattleTime":24200,"RegTime":1627565778, "Rank":0}
];

// console.log(rankerInfos);


const sameRankInfos = {};
for (const rankeInfo of rankerInfos) {
    const score = rankeInfo.Score;
    // 점수별로 정보를 수집
    if (!_.has(sameRankInfos, score)) {
        sameRankInfos[score] = [];
    }

    sameRankInfos[score].push(rankeInfo);

}


const newRankerInfos = []
if (!_.isEmpty(sameRankInfos)) {
    const scoreKeys = _.keys(sameRankInfos);

    for (const score of scoreKeys) {
        const sameRankInfoList = sameRankInfos[score];
        if (sameRankInfoList.length > 1) {
            const startRankerInfo = _.minBy(sameRankInfoList, 'Rank');
            let startRank = startRankerInfo.Rank;

            // 동점자들을 랭킹 우선순위에 맞게 정렬
            const sortScoreInfos = SortSameSocreInfos(sameRankInfoList);
            console.log(sortScoreInfos);
            // 정렬순으로 랭킹 재설정
            for (const scoreInfo of sortScoreInfos) {
                scoreInfo.Rank = startRank;
                newRankerInfos.push(scoreInfo);
                startRank++;
            }
        }
        else {
            newRankerInfos.push(sameRankInfoList[0]);
        }
    }
}


console.log('------------');
console.log(rankerInfos);
console.log('------------');
console.log(_.orderBy(newRankerInfos, ['Rank'],['asc']));

function SortSameSocreInfos (sameScoreInfos) {
    for (const sameScoreInfo of sameScoreInfos) {
        const accountValue = _.map(_.split(sameScoreInfo.AccountValue, ':'), x => Number(x));
        sameScoreInfo.RankAccountValue = _.min(accountValue);
        sameScoreInfo.BattleTime = Number(sameScoreInfo.BattleTime);
        sameScoreInfo.RegTime = Number(sameScoreInfo.RegTime);
    }
    // 우선 조건: 점수가 높은순(내림), 클리어 속도가 빠른순(오름), 등록 시간이 늦순(내림), AccountId가 낮은순(오름)
    return _.orderBy(sameScoreInfos, ['BattleTime', 'RegTime', 'RankAccountValue'], ['asc','desc','asc']);
};