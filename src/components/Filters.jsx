
import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Filters() {

  const { filters, setFilters: onChange } = useFilters()

  // const [minPrice, setMinPice] = useState(0)
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (e) => {
    const newValue = e.target.value

    // setMinPice(newValue)

    onChange(prevState => ({
      ...prevState,
      minPrice: newValue
    }))

  }

  const handleChangeCategory = (e) => {



    const newValue = e

    onChange(prevState => ({
      ...prevState,
      category: newValue
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          value={filters.minPrice}
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <Select id={categoryFilterId} onValueChange={handleChangeCategory} defaultValue={filters.category}>
          <SelectTrigger >
            <SelectValue placeholder="Selecciona una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="men's clothing">Ropa de hombre</SelectItem>
              <SelectItem value="women's clothing">Ropa de mujer</SelectItem>
              <SelectItem value="jewelery">Joyería</SelectItem>
              <SelectItem value="electronics">Electrónica</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
    </section>

  )
}
