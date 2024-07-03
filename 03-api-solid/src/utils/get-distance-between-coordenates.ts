import { getDistance } from 'geolib'

export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  // Essa seria a conta feita na mão, para retorno em quilômetros
  // Isso foi copiado e colado, não espere explicação

  // if (from.latitude === to.latitude && from.longitude === to.longitude) {
  //   return 0
  // }
  // const fromRadian = (Math.PI * from.latitude) / 180
  // const toRadian = (Math.PI * to.latitude) / 180
  // const theta = from.longitude - to.longitude
  // const radTheta = (Math.PI * theta) / 180
  // let dist =
  //   Math.sin(fromRadian) * Math.sin(toRadian) +
  //   Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)
  // if (dist > 1) {
  //   dist = 1
  // }
  // dist = Math.acos(dist)
  // dist = (dist * 180) / Math.PI
  // dist = dist * 60 * 1.1515
  // dist = dist * 1.609344
  // return dist

  // === MAS GRAÇAS A DEUS EXISTEM BIBLIOTECAS PRA ISSO ===
  const distance = getDistance(from, to)

  return distance // Distância está em metros
}
