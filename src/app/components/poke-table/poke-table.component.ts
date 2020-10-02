import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';

import { PokeAPI, Results, TYPE_COLOURS } from 'src/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  pokemons: PokeAPI;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() :void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;
      data.cards.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      })
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.pokemonService.getFilterPokemon(filterValue).subscribe((data: PokeAPI) => {
      console.log(data);

      this.pokemons = data;
      data.cards.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      })
    });
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

    _getTypeColour(type: string): string {
      if (type) {
        return '#' + TYPE_COLOURS[type.toLowerCase()];
      }
    }

    getPokemonDetails(pokemon: Results): void {
      this.router.navigateByUrl(`/pokeDetail/${pokemon.id}`)
    }

}
