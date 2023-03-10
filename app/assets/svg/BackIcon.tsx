import type { FC, SVGProps } from "react"
import { memo } from "react"

export interface IIconProps extends SVGProps<SVGSVGElement> {
    className?: string
    width: string
    height?: string
    fill?: string
}

const BackIcon: FC<IIconProps> = (props) => {
    const { width, className, fill, ...rest } = props
    return (
        <svg
            className={className}
            fill={fill}
            width={width}
            height="16px"
            viewBox="0 0 52 52"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
        </svg>
    )
}

export default memo(BackIcon)
