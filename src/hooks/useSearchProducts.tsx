import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constant'
import { Schema, schema } from 'src/utils/rules'
import { useQueryConfig } from './useQueryConfig'
type FormData = Pick<Schema, 'name'>

const searchSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmitSearch }
}
