export function buildWhereClause(params) {
    let whereClause = ""
    let first = true

    for(const [key, value] of Object.entries(params)) {
        const ANDKeyword = first ? '' : ' AND '
        const valueParam = key === "rating" ? `${value}` : `'%${value}%'`
        const comparisionOperator = key === "rating" ? '=' : 'LIKE'

        whereClause = whereClause + `${ANDKeyword}${key} ${comparisionOperator} ${valueParam}`
        
        first = false
    }

    return whereClause
}