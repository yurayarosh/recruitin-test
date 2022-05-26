import { ChangeEvent, FC, InputHTMLAttributes, useId } from 'react'

import styles from './Radio.module.scss'

interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
  onCustomChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Radio: FC<IRadio> = ({ children, checked, value, onCustomChange, ...attrs }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCustomChange?.(e)
  }

  return (
    <label className={styles.radio}>
      <input type="radio" checked={checked} value={value} onChange={onChange} {...attrs} />
      <span>{children}</span>
    </label>
  )
}

export default Radio
