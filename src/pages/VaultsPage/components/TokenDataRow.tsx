import React, { memo, useCallback } from "react";
import { css } from "@emotion/react";
import Collapse from '@kunukn/react-collapse';
import millify from 'millify';
import TableHeaderContainer from "./TableHeaderContainer";
import TokenDataCellContainer from "./TokenDataCellContainer";
import TitleText from "../../../components/text/TitleText";
import SubText from "../../../components/text/SubText";
import Container from "../../../components/layouts/Container";
import { ReactComponent as ChevronDownIcon } from "../../../images/chevron-down-icon.svg";
import useSetState from "../../../core/hooks/useSetState";
import TokenPayment from "./TokenPayment";
import { Theme } from "../../../theme";
import { TokenDataType } from "../../../includes/constants";

type DEFAULT_STATE = {
    isTradeOpen: boolean,
};

const DEFAULT_APP_STATE = {
    isTradeOpen: false,
};

type Props = {
    className?: string,
    tokenData: TokenDataType,
};

const TokenDataRow: React.FC<Props> = ({ className, tokenData }) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const toggleTrade = useCallback(() => {
        setState((oldState: DEFAULT_STATE) => {
            return {
                isTradeOpen: !oldState.isTradeOpen
            }
        })
    }, [setState]);

    return (
        <div className={className} css={style}>
            <div css={tableHeaderWrapperStyle}>
                <div css={tokenIconContainerStyle}>
                    <img
                        src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png"
                        alt=""
                        css={tokenIconStyle("left")}
                    />
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAADeCAYAAABSZ763AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAMvgAADL4Bfll0hwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d15fFTlvT/wz/c5sychC1uiQEACWMBkJkErVDEhgEtxrVDbX1Vq99sqVWuv1mLVaxWr1npvtVp7r3XpgtiqXVSWELRWRQyZCQFJQJGAAgIh6ySZmXO+vz8CyBJCMuecOWdmnvfr5euFk5lzvsnMZ56zPAtBslRR0RZ3Rsb2QiGUMQCPYdaGEVEeM4YyUy4RhgJaDkAEILv3VewCyHfw32GAIgc31wowA3SAmZqJuJkIzczczEx7haAmZqWpo+OUpq1bJ/RY8ftKvcjqAtJFWVn1MFWNTQVoMiAmA9pEgMYAGGlRSXsAbiKiBgCbANokBG2sqanYZ1E9aUUGzwTFxcszFMU5jVn7PDPOIsIZAI2wuq6B4U8B1AHiXSJeq6qxmrq68zutrirVyOAZoKzsPR9zy0xNQwVAnwcwBYDD6roMEgOonojXahpVOxxD/lVTMy1sdVHJTgYvTn5/9VhAKyfiC5ipHIDb4pISJUbENcz0GqCuCQbnBq0uKBnJ4A1CWVn16ZqmXcbMVwA0wep6bKKJCK8SiZfWr694x+pikoUM3kmUlVWN1zTMZ8blACZaXY/NNTDjRU3jZRs2zP7Q6mLsTAavD0VFr7gzM10XAnQtgPMg/05xoCDAT3u93qVvvz2jy+pq7EZ+oI7g96+YwKxcR0RfBjjX6npSRDPASwHtqWBw7hari7ELGTwApaXVZ2ua9h0AFwNQrK4nRTGA14XgJ9avn/2a1cVYLW2DV15e7Wht5UuZ8QOA/VbXk2ZqhaBfDxlCf1uzpiJmdTFWSMPg3Sn8/nMuAeinAMZbXU2aawLw8IQJ+59dtmyBanUxiZRGwWMqLa06X9Pop+i9wS3ZRyMRP1xU1LwsXQKYFsELBFZUMit3A5hsdS1Sf7ieGXeEQrOrra7EbCkdvLKyqvGqip8CuMzqWqRBWaNpdGtd3awGqwsxS0oGr6xsZbaqih8C+B7SpytXiqEoEf+fy9Vz79q1F7VZXY3RUi54JSUrryAS9wFIktEAUv/4UwD/GQzOfsnqSoyUMsGbOnXVSKeTHmDGxVbXIpliBTNuCoUqP7a6ECMIqwvQ704RCFR/w+nEOhm6lDaXCG+VlFR9HeCkbzCS+hcoLl4+QgjlUYBmW12LlEj8uqK4vldTM3OX1ZXEK2mDV1Kyah4RPQIgz+paJEu0CkE3rV8/669WFxKPpAteeXm1p7VVu5MZ37G6Fsl6RLxUVdWbk216iqQKXknJqolEeE4OQpWO0QCoVyfT6IekubgSCFRdSEQrZeikPkwClNV+/8pLrS5koGzf4s2f/7yydevQW5jxYyRBvZKlmAi/zc4WP7X7qAdbf5AP9kB5CkCF1bVIyYOZqjye7uvs3OPFtsErK3ujQNOiS5lxhtW1SMmHmTerqnNBff15O6yupS+2DF5xcfVUIbSlAE6xuhYpqe0B1KvsOAWh7S6uBAJVFwqhLocMnaTfSED5R0lJ1VyrCzmWrYIXCKz+EjOe+WxBDknSLYMIfwwEqr5idSFHss2hpt+/6lqAfgmbfRmkg4ICjzjjjCFKUVGmUlDgFiNHesTw4W7KznYIIQgZGcrhz4mmEXd2RgEAkQhzS0uEm5uj2oEDEW5ujvLu3d3a9u1hddu2sLZrV7emaWzZ73UMjUi7sbZ2zjNWFwLYJHh+f9U3AfwCNqkn1WVlKXTOOcMcFRXDnX5/tiM312nKl100yrxzZ5e2Y0eX1tQUVt96qzm2bt0BKy/zM8CLg8HZj1pYAwAbfNBLSlbfSMR3WF1HOpg2Lddx1VWj3DNm5DmcTkr4e//3v+/uufvuzXaY3PauYLDyV1YWYOmKNiUlq74jQ2e+iophzm99a5xnwoQMOWdor5+VlFSpoVDl/1hVgGXB8/tX/T+A7rNq/+mgsNAnfvSjCd6zz851Wl2L3RDhrpKSlR2h0JynrNi/JRcySkpWLwDov2GDQ91Udckl+a4//OHMLBm6EyIi8WAgsOpKK3ae8OD1dnbmR63Ydzrw+RR64IGpvsWLT/e53Yk/j0sygpl+Y8V9voR++P3+FX5m/h1SZ7VUW8nKctBjj/kzysuHuayuJYk4iPj3paXLyxK504QFr6zsjQJA/FHeHDdHTo6THn/cnzllSpb8Uhs08mqa4w/FxdWjErXHhARv0qQ3s1Q1ugyggkTsL904HAL33z81Y+LETHnVMn4jhdBeKCtbmZ2InZkevPnzn1e83p6nIdcrMM1tt030lpZmy5ZOv0mxmPK/8+c/b/oXmOnB27Jl6GLI8XSmufzyAtcll+TL2bINQsSVjY15PzF7P6YGz+9ffRGAG8zcRzobMcItrr9+vNfqOlINEd1o9jQSph2e+P0rJhBpjzPLS9pmue22Sd6sLIdpf9/ubo337o1o7e0xDodV7uiIcnt7jN1uQZmZTsrIUGjYMBcVFHiFEMk/yewRCBC/Li5evdmshVNMCV5x8fIMQPyBmbLM2L4ElJbmOM45J8/Qm+P790e1f/97f3TdugOxDRva1E8+6dJ4AIMLXC6BsWN9yrhxGaKoKEP53OeylIkTMxWzOl8nSCaR9vvp09+a9fbbMwzvX2pK8BTFcR8z5GxgJvr2t8d6jNpWTU1r7Lnnmrrfeqs5Fs8wnkhEQ2Njh9rY2KEuX47oocdHjnSL0tIcZdq0XEdpaY6jqyu51pwkotO7urp+DuAmw7dt9AYPzvD8rNHblT5TWprjeOIJf6be7ezZ06MtWdIYfvPN/baekct62sJgcM7LRm7R0EOBsrI3Cg5Oqy6Z6LLLCnT3TKmpaYl99avr2mXoBkI8dOaZ1fmGbtG4Td0pVDXyG8i1DEzl8ylUXj5c17ldTU1L7Prr6zra2mK2GR5uc0NjMe1RI1cpMix4gcB5XwfoPKO2J/VtzpzhTq9XxP0B2Ls3ov34x/Wd0ahmZFkpjxmz/P7V1xq1PUOCd+aZ1fnM2mIjtiX17wtfGKbrgtgDD2zpki1dfIj47t4+x/oZErxoVHsIQEL6uKUzIQhlZTlxH2Y2NHTGqqv3Rk/+TKkvzJSlaZGHjdiW7uCVlq6+AsBFBtQincTUqVnKkCHx3zD/8593RIysJx0x0/nFxVW6Vx7WFbyyspXZmsZy+oYEKS6OvyN0JML8+uuytTOCEHhgypRqXbdzdAVPVZUfAxihZxvSwI0fH/9kRbW1LbH2dlWe2xljpNOp3axnA3EH74wzVp0G8Df07FwanAkTsuJ+v4LBVnm/zlj/UVZWNT7eF8f9RioKLQEgh6Mk0Nix3rhbvPr6tuTqr2V/LlXlu+J9cVzB8/tXlgOYE+9OpcHLzXWS2x3//bsPP+yUN+4MR18sLq6aFc8r4wjenQIQ98SzMyl+Q4e64j466erSeO/eHhk8EwiBO+Lp0TLoN7Ok5AuXQU7jkHD5+Z64W7v9+yMDGt4jxaWkpKTqi4N90aCCN3/+8wqR+M/B7kTSb8gQR9wtXktLVMbOXLf3HgkO3KCevHVr3nwAEwdVkmQItzv+Oz/t7bKLmJmI6PTS0pmXDeY1A343y8urHQDdMviyJCO43Urch5qyQ7T5NI1vHczsZAMOXmurehkzTouvLEkvV/zXVhCN2md1yBQ2YcuWvAF3JRvwu6lp4rvx1SMZwaFjTiMbrcqa0ojo+oE+d0DBKy5edS4RJ3RueelYqTSJV2piRmkgsGr6QJ47oOAJQT/QV5IkpQfmgWXlpF+jfv/rE4DY2oE8VxocIQiPPebPGMhzCwo84pRT3HF1GWtujmrbtoUT1mVs+/ZO7b77Gu2w5LIVNCGin1+//oKt/T3ppMNMmGPXEcnQmaWsLNv0hSPz8pwiLy87YXNcZmQ40rlDtmB2Xgug3xkZ+n0ziopecRNhvqFlSVKKY8ZXi4pe6XcAQb/By8pyXQxgqKFVSVLqy8vIcPc7K0O/wWMmw2ZVkqR0QoSr+/v5CYN3cJDfFwyvSJLSw3mBQFXhiX54wuBpGuZDXsmUpHgJgK/s54d9Y8agOn1KknQ0ZrriRD/rM3glJaunAJhkWkWSlB4mFxev7jNHJ2jx+HIzq5GkdKEofWepz+ARycNMSTICM/d5uHlc8A42jXFPWyZJ0pFoQmnpa0XHPnpc8IhYzh4mSQZSVUflsY8d11eTCMc9STIHM+P++7eEB/Lc6dPznDNnDo27X+eTT37U3dycmKHoBw5E5ADAo80B8MSRDxx1n66s7D2fqrZ+CDlRre1cd91Y9/e+N9Yb7+uvvPLdtu3bw3IOCAsQodvj8Z729tszDo/YOOpQk7llJmToJMlQzPB0d/cc1QvsqOBpGioSW5IkpQdmPipbx1xcobMTWYwkpQtmfP7I/z8cvOLi5RkAJie8IklKA0Qonj79rcPn6IeDJ4Q4EwMYkS5JUjzYGQ53Hp4w7IhDTTrLinIkKV0IQYcPNw8HjxkyeJJkIuY+gkdEZ1hTjiSlB2YczpgAgLKy6mGQa5lLkqmIkH8wa73Bi8VU2dpJUgJEo+rngIPBI5K3ESQpEQ5l7dA5ngyeJCWEOCp4crFJSUoAIbRJwGfBG2NhLZKUNph7sybKy6s9AA23uB5JShOUX1S0xS0OHFDHQM6fKUmJQtnZTaOEEIo8zJSkBIpGUSg0TRttdSGSlE6EwBgB2WNFkhJtmCDiPKurkKT0wnmCWa5/J0kJNlQIQblWVyFJaUa2eJKUaESUJwAMsboQSUonzMgWkPNoSlKiuQUAl9VVSFKaccngSVLiuQSzDJ4kJRa7BRHiXoFGkqR4kOsESzFLkmQmwYyo1UVIUnrhiCBCxOoyJCm9UI8AZPAkKcEiMniSlHgRAaDH6iokKc30CIBara5CktIJM7UIZuy3uhBJSidE3CyI+IDVhUhSOjkYPNniSVIiMYv9gpmbrS5EktIJkdYsmGmv1YVIUjphpv0OIcQOZs3qWpISEVBQ4BFjxvhEfr5beL0Keb0KMjIcpKqMcFjljo4Yh8Mq79gR1j76qFNrb1fZ6rolazHzdgez2A7I4A1EVpZCpaW5jtLSHIffn6OMGeNVPB5lUNs4cCDCDQ0d6vr1LbGamgOxzZs7VE2TWUwnDgc1OXJytB0tLWDI9RP65PMpNGvWcOeFF+Y7S0qyHYqi78+Um+uis8/Oc5x9dp4DANraolxdvTf66qt7IqFQq2pI0ZKdaa2tPTsda9ZUdPv9q/YCJGeUPkJhoU9cc80Yd0XFMJfX6zBtP0OGOOnSS09xXXrpKa6dO7u0v/zl48iLL34S6emRzWCK2r1160U9hz5R2yGncgcAFBVlKAsXFrrLy4c79bZugzVqlFcsWlTkueaaMe6lSz/uWbZsZyQclueEqYSZm4DDC1OKRiuLsQOvV9D114/3/P73ZZmVlSMSHroj5ea66LvfHedZuvSsrHnz8uXUHCmEiBoA4GCLp21K51O8uXNHOG+4Ybx36FC3rf4Iw4a56fbbT/fOmTPS+eGHnfL8LyXQJuBg8IjERub0O6Jxu4l+8IPxniuvHGXrVuWss3Id06blOIgI6fg+pZiNwMHgOZ1afSRiqy970xUW+sR9903OGDcuMynmnXE6iRSFoGmAvP2QvKLRyPvAwXO8d9+dvR/gT60tKXGmTh2iPP54IDNZQnckIQhWnn9KevCujRsvaAYOX1wBANRZVE1CnXVWruORR4ozc3KcSfvpJZLhS0604dC/jgieeNeKUhJpxoyhjgcfPCPD5zPvvlyi9IYv6RrstEZEaw/9W3z2IK/t++mpYerUIco993wuw+lMnQ8rEWTLl0SY+Z1D/z78KRQi+z0AMUsqMllhoU88+OAZGWb2QLGKPOxMFhT1er21h/7vcPBqaqaFAaq3pijzuN1E//Vfk33Z2cl7TncyRAQhUvbXSxWht9+e0XXof4467krFw82bb57omTAhc3BDCJKQEASS2bOxo7N11LGXplE1EX8nsQWZp7JyuPPiiwtMuzne1RXDhg3tsbq61tiHH3ZqO3aEtZaWmBYOx+B2C3g8Co0Y4aYxY7zK6adnKYFAtmPs2AxBJiVECAFVlUO87IiIqo/8/6OC53AM+ZemtXYzw5PYsozn8yn0wx8Wec3YdijUov7jH7sjb7yxL9rT03dPrnBYQzgc4+bmHt68uU1bsWJPFABOOcVHF1wwwjVvXoErL89laAKJels+eYPdXpjR7fV63jrysePeeL+/6q8AKhJWlUluvLHIs2DBKEOXmQ6FWtQnn/you75e/7g5l0vBJZcUuK65Zox7yJCTn38qCmigV2RVVcOxPcuuvPLdtu3bw7I5tASvCgZnzz/ykT7eSa5KVDlmGTcuQ3zpS6cYFrrOzhgvWbK5a9Giuk4jQgcAkYiKF17YGbn66vc6DrWGRpEXWuxGrDzukWMfYMZxT0o2CxeO9hh1c3nLlg71m9+s7XjttT1RwPhDuNbWCN977+auJUsaurq7jRmAQCQvtNiJohzfmB336QyFZjcCSNrxeaee6hWVlSMMWeU2GGyNLVoU6ty1K2z6SdNrr+2O/uhHGzrb2qKG7Eu2enbBW2pqKj849tETNAv8stnlmOXqq0e7jWjtampaYrfcUhcOhxPXp6C+vlW95Zb6TiP2KVs923ihrwf7/IQK4XzR3FrM4XYLmj1bf2u3dWununjxxnA0mvhrEQ0NbdrPfra504jbAmbdtpAGjhkv9fV4n8Fbv/6895l5s7klGa+iYrgjI8Oh69PW2RnjO+7YlNCW7ljr1u1Xn3mmSffyafJw02pcf/DU7Tj9HJNRn0m1s/PPH6n7Zvljj33Y/ckn5p/TncwzzzT1bNzYpvtqi2z1rMMs/nqin50weJrGy2DGZTyTeDyCyspydPWCrq9vU//5z92GXtqPFzPjkUe2dqk6JxmTubOM5nCofznRD08YvA0bZn9IhDfNqcl4gUCOonfIz+9+91G3nb5rGhvbtTVr9ur6IpAtnjWIsKamZk7TiX5+kk8qPW10QWYxorULBg/YbiavP/5xR4+eCY6IZKtnBWZ+tr+f9xu8SGTf3wHsM7QikxQXZ+sK3iuv7IoYVYuRPvigQ9u0qV3nF4JMXoLt7+iIvNrfE/oN3saNCyIALzO2JnOMG5cR93FmT4+KNWv22eLcri9VVZ/qPNw0qhJpIIj4j1u3XtTvVekBfFi1p2Dz5YTy8pyUmRn/bYT33++IWXn74GTeffeAruJk8BJKE+Lkp2gnDV4wOHcLM1YYU5M5xo3L0DXQta6uxXbndkfauTOsdXbqubwpk5dAr/TVRexYAzo8I6Jf66/HPMOH65t6fdu2sK2DBwAtLfF3o5EtXuJo2sCyMqDgBYOz/g3Qe/pKMo/Pp2+2n507u2x9KA0ALS36Ok/L2wrmI8L6urpZA5o+ZcAXJITAb+IvyVx6u4np/VAnQiSib9EEt1smz3z0yECfOeDgDRlCfwNw0mNXK3g8+joldnXZf64EvR22MzJSb2pDm2ksKtr3z4E+ecDBW7OmIsZMv4ivJnOpqr7WQFHsf/UhFGpRu7s1jve/bds6bX84ncyYsWTZsgUDvlYwqHtfodAbLwDYNOiqTBbWeW0kGVoDn0/fDIV2vl2S/Pj9UOhfgxrDOsibzndqAD8wuNeYr7MzpqvFGznSbft53YcPj7/GWExDT49cWM884p7ebAziFYPdRTBY+TLAtppxuqNDX/DGjPHaPnijR/virlHv30fqV20wWNFv97C+xPFmEhPR7YN/nXmamvTdDjj99CxbzzTtcikoLPTGXeOOHfa/XZKsmLU7ABr0F1tc36K1tZVvABh0ys2yY0eXqmfcmt+vb2SD2YqLsxW3O/7vhp07u2zfQSA50cuh0Jy4hs7FffiiabHbAeiensAIkYiGPXu64/5WLyjwiAkTsmx7uDlz5lBd88hs3y5bPBP0qKp2d7wvjvvDVld3/jYi/m28rzdaQ4O+oTNz5owwbY0FPZxOgfLy4bqCp/dvIx2PmR/dsGH2h/G+Xte3vMsVedAua6fX1rbqul4+b16BMzPTftm74IJ850CmeD+RaFRDMGjvTuDJh3fFYsrDeragK3hr117Uxky36tmGUfQOnfH5FLriigJD11rQS1EEvvIVfes/bNrUpnZ3279nTjJhxo83bqzo0LMN3ec1oVDliwAPuKuMWbZvD2ufftqt6wN21VWj3MOHe2zTi+Wqq0a5TjlF362O995rse0A3+TEfwuFZv9D71YMuaAQi+FmAK1GbEuPqqq9uqZv8PkcuOmmIq8dxq+NGuUTX/vaaF3LpTEzVqzQN3pdOkqborgMOcIzJHj19bP3EFHcV3iMYsTUfNOnD3UsWDDK0pM9l0vBXXdN9upds33jxna1qUkuzWUcvqOmZuYuI7Zk2CX02tqKpwBUn/SJJvrgg061sbFD94WEb397rGfGjKGW3NsjIvzkJ5O848frG1UPAMuX77HlBE7JiJmqgsHKZ4zanoH3roidTvEfAPYbt83BW7Zsp+4Pm8MhsHjx6b5AIDehPVqICDffPMGj9/YBALS1RfmVV+wxOW8K2Keq2vfj6aFyIobeNF63rmI3QIuM3OZgvfrqnsju3fHfTD/E63VgyZIpGRUVIxLS8rlcCu6883PeefOMWbP9hRc+joTDOqehlgAARLihvn72HiO3afg3+u7dT2/Jz7+2AIDf6G0PBDOgqowZM/T19gB6W77zzhvmzMlx0vr1LTGz1hYfPdonHnrojIxAINeQkIfDKi9evCnc0yNP7/Ri5v8NBmc/ZvR2TekmpSjZPwHQYMa2B+Lll3dFduww5qICEeHyy091/fa3gcySkhxDv6icToFrril0P/lkaeZpp2Ua9l4891xTT1ubHJFggE0+n2+xGRs27bp5aelrRZrmrAIwxKx99Ofss/McDz9cnGHkNpkZa9ceiD33XFOPnrXQXS4FX/xivuuqq0a5Ro70GPrl19QU1r72tffarVjbL8V0AI5ZweB5W8zYuKk3rAKBqguZ8Qez93Mi99wz2WfUsszH2ratU1u1am9k3brm2JYtHdrJ1jfw+Rzw+3Mc55471DFz5jCn3gma+sLMWLSornPdOn29eCSwpuHaurrKv5u1A9MDEQisuoOZbjR7P33Jy3PSM89Myxo6VN+8myfT0RHjjz4Ka598EtZaWmJaOKzC4SD4fAqNGOGmU0/1KmPGeIURS0T356WXPo7cf/+WLlN3khb4gWBw9r1m7sH04M2f/7zS2DhsKRFXmr2vvkybluv41a+KMxR9U2/a3rZtHdrXv76+o6dH9svUh1cFg29+ebBTOQyW6fepNm1axsOGLXxFUbS5AI0we3/H+uSTbs3hIAoE7D3YVY9wWOUbbqjr3L8/IkOnAzNv9ngi8z/++FvdZu8rIYM/N26s6FAU1wIAnyRif8d68smPul99dVdK3kyOxTQsXrwpvH277BqmBzN2A3Tl2rUXtSVifwkbdV1TM3MXEX0VQGei9nkIM3DvvVvCa9c2p9RFB2bGkiUNXW+9tT+lfi8LdGiatiAUqvw4UTtM6HQHtbWzQsy4DkDCPyixmIbbbqsPh0KpMShU0xi//OXWrn/+U/bH1IeiRLRww4Y5GxK514TPrrVnzzMf5Odf3QjQxUhw8GMxxooVn0bGjvUpepf2slI0quHnP28I/+1vqXn4nECqEPSd2tpZryR6x5Z8+HbvfrYhP3/hTgAXIcH3+FSVUV29Lzp8uEtMmmTvaf360tkZ41tv3Rh+/fV98vBSHwb4ptrayj9bsXPLPni7dz+9IT9/4QEAcxK9b2bgzTf3x/bt6+Zp03KdDodtJxg7SmNjh7poUahT/5roEjPuCIVmP2nV/i39xt+9++ma/PxrewCUW7H/hoYO9c0398dKS3McOTku297oY2a8+OInkdtv3xQ+cMD+S4olgbtCocr/trIAW3zYAoHqbzBrv0CCz/kOcTgEFiw41f3NbxZ69I76NtrOnV3aQw9t6XrnndS6ImsRJsLttbWVlq/1aIvgAUBJyeoFRPwoAMs++aee6hGLFhV5zjlnqNPqFVTb26P87LM7ev70p509sZi8RWcAlRk3hkKVz1pdCGCj4AFAaenqKzQNjwNsSsfmgSoqylCuvnq0u7JypDPRXc1aWqL84osfR/70p5097e1yaI9BYsziB6FQxVKrCznEVsEDgJKSqrlE+D8Ahg7piUdhoU/Mm5fvmjt3hGvECPOm/dM0xoYNbbFXX90dXb58T1TOg2moDiJaWFs7q8rqQo5ku+ABQEnJ6ilEvBTAqVbXAgBCEKZNy3Gce+5QZ1lZrmPsWJ/Qeyja1RXDxo3tsXXrDsRWrvw0umuX/ukqpOPsIaIv19bOClldyLFsGTwAOPPM6vxoVFsKoNjqWo6Vl+ek0tIcx7hxGUphoU+MHu0TI0a4hMejkMdz9IXijo4Yd3bG+OOPu7UdO8La9u1hrbGxQ62ra4vJwaqm2qRp4st1dRU7rS6kL7YNHgBMmvRmlscTecqqIUXxEIKQmalQLMaQkw1ZhVdFo8rX9U6zbiZbB68Xk9+/ehGAxbDodoOUNBjAIxMm7L9n2bIFtu5kkATB61VSsvp8In4CQLbVtUj2Q8TtqkrfN3O6BiMlTQsSCs1aLkR0NjNvtroWyXY2CUEVyRI6IImCBwDr11+wNTdXqSDCE+g9rJDSHBEvVZTsOTU1lR9YXctgJM2h5rECgRWVzOIxK6aTkGxhHxFuqK2tfNXqQuKRVC3ekWpr51YRRc4BsMLqWqSEW+N0inOTNXRAErd4n2EqKVm1kEjcCYsmz5USphXgn/Wu2mPcAiJWSIHg9Sou/vcIIXp+AfClVtciGY+IlwPaTbW1cy2ZMMtoKRO8Q4qLqy4WAg8AGGl1LZIReBcgbgkGZ1m+3LeRUi54AFBW9p5P01pvALCIGbqWM5YsEyHCU+Gw++cNDee0W12M0VIyeIeUlFSdO7p5yQAAAlFJREFUKgQvZqYvW12LNHBEvJxZuTUYrPjI6lrMktLBOyQQqJrJjLsBlFhdi9SvWmbtjlBozptWF2K2tAjeIX7/ynJA3AUbjnhIZ8y8mQj3B4OVLyf71cqBSqvg9WLy+6suBfATgCZYXU2aayTih4uKmpfZvVOz0dIweL3mz39e2bIl72JAfB/gaVbXk174PSLxP7W1b/zD7FV57Cptg3ckv3+Fn0h8l5muhMVTHqYwjYhXMvPjweCcNVYXYzUZvCMcXD56IYCrAAy1uJxUsY8IfxYCv0+2jsxmksHrw5Qpz7uczryLiHAVM82GbAUHSwPwBhEvzc5WXlqzpsL09eaSjQzeSQQCVYUAX8lMVwCYbHU9NreRiP4qhPpCTc2cJquLsTMZvEEIBKoKmXE5gK8AmGh1PTbRQISXNI3/GgrNbrS6mGQhgxcnv796LKCVAzgPvQuvWD4PaCIwo5sI7wB4HVDXBINzg1bXlIxk8AxQXl7taW3FOcxcwYzPE6HY6tmwjUNRACGA1xJRdXY2/Vues+kng2eC6dPf8nZ1dZcCPB3AWcw4gwj5Vtc1EMzYTYQ6In6XWbzj9XrWv/32jC6r60o1MngJMmXKa3mK4phChMmAmCyENknTqJAII5H494EB3s2M7UTUANAmTdPeZ+6u37Bh3oEE15KWZPAsVlT0invIEDGaWRQyK6MBGs7MeUScByCPWeT2/psJoCz03tpw4rNzyk4AUQAqwO0AMTM1E2kHADT3/hv7AezTNDQ5HNGmtjZtx9atF/VY8gtLAID/Dx6A+iCefN6bAAAAAElFTkSuQmCC"
                        alt=""
                        css={tokenIconStyle("right")}
                    />
                </div>
                <TableHeaderContainer css={tokenDataRowStyle} onClick={toggleTrade}>
                    <TokenDataCellContainer>
                        <TitleText css={titleTextStyle}>{tokenData.name}</TitleText>
                        <div css={tokenCellFarmContainerStyle}>
                            <SubText>Farm: {tokenData.farm}</SubText>
                            <SubText>TVL ${abbreviateNumber(tokenData.total)}</SubText>
                        </div>
                    </TokenDataCellContainer>
                    <TokenDataCellContainer align={"right"}>
                        <TitleText>{abbreviateNumber(Number(tokenData.apy))}%</TitleText>
                        <SubText>0.51%</SubText>
                        <SubText>{tokenData.autoX}</SubText>
                    </TokenDataCellContainer>
                    <TokenDataCellContainer align={"right"}>
                        <SubText>–</SubText>
                        <SubText>–</SubText>
                        <SubText>–</SubText>
                    </TokenDataCellContainer>
                    <Container>
                        <ChevronDownIcon css={iconColorStyle(state.isTradeOpen)} />
                    </Container>
                </TableHeaderContainer>
            </div>

            <Collapse isOpen={state.isTradeOpen} css={collapseStyle}>
                <TokenPayment css={collapseContentStyle(state.isTradeOpen)} tokenData={tokenData} />
            </Collapse>
        </div>
    );
}

const abbreviateNumber = (num: number) => {
    return millify(num, {
        ...(num > 1000 && { precision: 1 })
    });
};

const style = (theme: Theme) => css`
    border-bottom: 1px solid ${theme.colours.border};
`;

const tokenIconContainerStyle = (theme: Theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    position: absolute;
    height: 60px;
    padding: 0;

    ${theme.breakpoints.only("xs")} {
        width: 40px;
        justify-content: flex-start;
    }
`;

const tokenIconStyle = (align: "left" | "right") => (theme: Theme) => css`
    width: 32px;
    height: 32px;

    ${align === "right" && css`
        margin-left: -16px;
    `};

    ${theme.breakpoints.only("xs")} {
        width: 24px;
        height: 24px;
    }
`;

const tokenCellFarmContainerStyle = css`
    display: flex;
    flex-direction: column;
`;

const tokenDataRowStyle = (theme: Theme) => css`
    position: relative;
    padding-left: 80px;
    height: 74px;

    ${theme.breakpoints.only("xs")} {
        height: 52px;
        padding: 0 0 0 40px;
    }
`;

const iconColorStyle = (isTradeOpen: boolean) => (theme: Theme) => css`
    fill: ${theme.colours.text};

    ${isTradeOpen && css`
        transform: rotateX(180deg);
    `};
`;

const tableHeaderWrapperStyle = (theme: Theme) => css`
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;

    ${theme.breakpoints.only("xs")} {
        height: 52px;
        margin: 8px 0;
        padding: 0 8px;
    }
`;

const collapseStyle = (theme: Theme) => css`
    width: 100%;
    display: block;
    position: relative;
    overflow: hidden;
    transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const collapseContentStyle = (isOpen: boolean) => (theme: Theme) => css`
    border: 1px solid transparent;
    position: relative;
    transition: ${theme.transitions.transitionSlowerTime};

    ${isOpen && css`
        border-color: transparent;
    `};
`;

const titleTextStyle = (theme: Theme) => css`
    ${theme.breakpoints.only("xs")} {
        height: 20px;
    }
`;

export default memo(TokenDataRow);