export function buildWhereClause(params) {
    let whereClause = ""
    let first = true

    for(const [key, value] of Object.entries(params)) {
        const ANDKeyword = first ? '' : ' AND '
        whereClause = whereClause + `${ANDKeyword}${key} LIKE '%${value}%'`
        first = false
    }

    return whereClause
}