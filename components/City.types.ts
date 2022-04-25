export type City = IRootObject

interface IRootObject {
  fields: IFields
  geometry?: IGeometry
}

interface IFields {
  population: number
  name: string
  country_code: string
  coordinates?: number[]
  cou_name_en?: string
  label_en?: string
  dem?: number
  geoname_id?: string
  ascii_name?: string
  alternate_names?: string
  timezone?: string
  elevation?: string
  country_code_2?: string
  admin4_code?: string
}

interface IGeometry {
  type: string
  coordinates: number[]
}
