export default function formatDateToString(isoString: string){
    return isoString.split('T')[0]
}
