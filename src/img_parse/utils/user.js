import { asyncTimeOut, currentPage, nav, route, ObjectManage, QuickEvent, pages, getPlatform, TopView, userConfig } from '@/duxapp'
import { useEffect, useState, useMemo } from 'react'
import qs from 'qs'




  export const user = new ObjectManage({cache:true,cacheKey:'token',defaultData:{token:''}})
