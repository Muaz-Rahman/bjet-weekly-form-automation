const understandabilityLevel = {
    1: '1(impossible to understand)',
    2: '2(difficult to understand)',
    3: '3(a little difficult to understand)',
    4: '4(understandable)',
    5: '5(easy to understand)'
}

const week = "10"

const attendanceArray = ["18", "0", "0", "2"]  //Present Delay Skip Absent

const dailyQuizArray = ["20", "18", "19", "19", "19"] //Mon-Fri 

const weeklyWritten = "47" //Out of 50

const weeklyOral = "14" //Out of 20

const goodPoint = "Learned more kanjis and improved reading speed"

const improvementGoal = "To be able to read and write more kanji and increase reading speed"

module.exports = { understandabilityLevel, attendanceArray, dailyQuizArray, weeklyWritten, weeklyOral, goodPoint, improvementGoal, week }